// src/application.js
import { Application } from "@hotwired/stimulus"

import ThemeGeneratorController from "./controllers/theme_generator_controller"
import OutputClipboardController from "./controllers/output_clipboard_controller"

window.Stimulus = Application.start();
Stimulus.register("theme-generator", ThemeGeneratorController);
Stimulus.register("output-clipboard", OutputClipboardController);
