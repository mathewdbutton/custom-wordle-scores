// src/application.js
import { Application } from "@hotwired/stimulus"

import ThemeGeneratorController from "./controllers/theme_generator_controller"
import OutputClipboardController from "./controllers/output_clipboard_controller"
import PreferencesSaver from "./controllers/preferences_saver_controller"

declare global {
  interface Window {
    Stimulus?: Application;
  }
}

window.Stimulus = Application.start();
window.Stimulus.register("theme-generator", ThemeGeneratorController);
window.Stimulus.register("output-clipboard", OutputClipboardController);
window.Stimulus.register("preferences-saver", PreferencesSaver);
