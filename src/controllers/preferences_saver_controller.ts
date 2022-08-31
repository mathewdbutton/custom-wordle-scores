import { Controller } from "@hotwired/stimulus"
import { flashMessage } from "../lib/messages";

export default class extends Controller {

  declare readonly inputTargets: Array<HTMLInputElement>;

  static targets = ["input", "message"]
  THEMESTORAGEID = "savedTheme";

  connect() {
    this.loadFromPreferences();
  }

  saveToPreferences() {
    let selectedThemeComponents = this.inputTargets.map((input) => {
      return { "id": input.id, "emoji": input.dataset.selectedEmoji, "displayText": input.value }
    });

    window.localStorage.setItem(this.THEMESTORAGEID, JSON.stringify(selectedThemeComponents));
    flashMessage("Saving theme 💾");
  }

  clearPreferences() {
    window.localStorage.removeItem(this.THEMESTORAGEID);
    flashMessage("Theme cleared 🗑");
  }

  loadFromPreferences() {
    let savedThemeComponents = JSON.parse(window.localStorage.getItem(this.THEMESTORAGEID) || "{}");
    if (Object.entries(savedThemeComponents).length === 0) {
      savedThemeComponents = [{ "id": "miss", "emoji": "🥇", "displayText": "🥇 1st place medal" }, { "id": "wrong", "emoji": "🥈", "displayText": "🥈 2nd place medal" }, { "id": "hit", "emoji": "🥉", "displayText": "🥉 3rd place medal" }];
    } else {
      flashMessage("Loading theme 💾");
    };

    let indexedThemeInputs = this.inputTargets.reduce((previousValue, currentValue) => {
      previousValue[currentValue.id] = currentValue;
      return previousValue
    }, {});

    savedThemeComponents.forEach((savedComponent) => {
      let matchingTarget = indexedThemeInputs[savedComponent["id"]];
      matchingTarget.value = savedComponent["displayText"];
      matchingTarget.dataset.selectedEmoji = savedComponent["emoji"];
      matchingTarget.dispatchEvent(new Event("selected"))
    })

  }
}
