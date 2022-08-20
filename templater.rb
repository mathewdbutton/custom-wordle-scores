#!/usr/bin/env ruby

require 'erb'
require 'json'
require 'delegate'

template_path = ARGV[0]
variable_path = ARGV[1]

template = File.read(template_path)
variables = JSON.parse(File.read(variable_path))

  class EmojiPresenter
    def initialize(emoji_hash)
      @details = emoji_hash
    end

    def short_code
      @details["shortname"].gsub(":","").gsub("_"," ")
    end

    def emoji
      @details["emoji"]
    end

    def display_name
      "#{short_code} #{emoji}"
    end
  end

  class IndexHelper
    def initialize(file, template, emojis:)
      @emojis = emojis.uniq {|emoji| emoji["shortname"]}.sort_by { |emoji| emoji["shortname"]}
      @file = file
      @template = template
    end

    def emojis(&blk)
      @emojis.each do |emoji|
        yield(EmojiPresenter.new(emoji))
      end
    end

    def build
      @file.write(ERB.new(@template, nil, "<>").result(binding))
    end
  end


File.open("./src/index.html", 'w') do |file|
  IndexHelper.new(file, template,**variables.transform_keys(&:to_sym)).build
end
