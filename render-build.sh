#!/usr/bin/env bash
# exit on error
set -o errexit

./templater.rb ./src/index.html.erb variables.json
npm run build
