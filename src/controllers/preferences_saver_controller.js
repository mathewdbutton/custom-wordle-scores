import { Controller } from "@hotwired/stimulus"
import { flashMessage } from "../lib/messages";

export default class extends Controller {
  static targets = ["input", "message"]
  THEMESTORAGEID = "savedTheme";

  connect() {
    this.loadFromPreferences();
  }

  saveToPreferences() {
    let selectedThemeComponents = this.inputTargets.map((input) => {
      return { "id": input.id, "value": input.value }
    });

    window.localStorage.setItem(this.THEMESTORAGEID, JSON.stringify(selectedThemeComponents));
    flashMessage("Saving theme 💾");
  }

  clearPreferences() {
    window.localStorage.removeItem(this.THEMESTORAGEID);
    flashMessage("Theme cleared 🗑");
  }

  loadFromPreferences() {
    let savedThemeComponents = JSON.parse(window.localStorage.getItem(this.THEMESTORAGEID));
    if (savedThemeComponents === null) return;

    let indexedThemeInputs = this.inputTargets.reduce((previousValue, currentValue) => {
      previousValue[currentValue.id] = currentValue;
      return previousValue
    }, {});

    savedThemeComponents.forEach((savedComponent) => {
      let matchingTarget = indexedThemeInputs[savedComponent["id"]];
      matchingTarget.value = savedComponent["value"];
    })
    flashMessage("Loading theme 💾");
  }
}