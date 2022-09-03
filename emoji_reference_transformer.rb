#!/usr/bin/env ruby

require "json"

file_path = ARGV[0]

emoji_reference_data = JSON.parse(File.read(file_path))

# const searchableEmojis = emojis["emojis"].reduce((emojiSet, emoji) => {
#   const searchName = emoji["shortname"].replaceAll(":", "").replaceAll("_", " ")
#   emojiSet[searchName] = emoji
#   return emojiSet
#  }, {})


filtered_reference_data = emoji_reference_data["emojis"]
                          .uniq { |emoji| emoji["shortname"]} ## Remove duplicates
                          .map { |emoji| emoji["shortname"] = emoji["shortname"].gsub(":","").gsub("_"," "); emoji}
                          .sort_by { |emoji| emoji["shortname"]}
                          .reduce({}) { |acc, emoji| acc[emoji["shortname"]] = emoji.slice("emoji"); acc} ## Convert to useable format & remove unneeded keys

puts(filtered_reference_data.to_json)
