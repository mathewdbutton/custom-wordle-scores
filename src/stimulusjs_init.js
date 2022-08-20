// src/application.js
import { Application } from "@hotwired/stimulus"

import EmojiPickerController from "./controllers/emoji_picker_controller"
import ThemeGeneratorController from "./controllers/theme_generator_controller"

window.Stimulus = Application.start()
Stimulus.register("emoji-picker", EmojiPickerController)
Stimulus.register("theme-generator", ThemeGeneratorController)
