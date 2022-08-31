import { Controller } from "@hotwired/stimulus"
import { flashMessage } from "../lib/messages";
import { migrateTheme } from "../lib/theme_migrator";

export const THEMESTORAGEID = "savedTheme";

export default class extends Controller {

  declare readonly inputTargets: Array<HTMLInputElement>;

  static targets = ["input", "message"]

  connect() {
    this.loadFromPreferences();
  }

  saveToPreferences() {
    let selectedThemeComponents = this.inputTargets.map((input) => {
      return { "id": input.id, "emoji": input.dataset.selectedEmoji, "displayText": input.value }
    });

    window.localStorage.setItem(THEMESTORAGEID, JSON.stringify({version: 2, selectedValues: selectedThemeComponents }));
    flashMessage("Saving theme 💾");
  }

  clearPreferences() {
    window.localStorage.removeItem(THEMESTORAGEID);
    flashMessage("Theme cleared 🗑");
  }

  loadFromPreferences() {
    let savedTheme = migrateTheme(JSON.parse(window.localStorage.getItem(THEMESTORAGEID) || "{}"));

    if (Object.entries(savedTheme).length === 0) {
      savedTheme = {"version":2,"selectedValues":[{"id":"miss","emoji":"🤏","displayText":"🤏 pinching hand"},{"id":"wrong","emoji":"❌","displayText":"❌ x"},{"id":"hit","emoji":"✅","displayText":"✅ white check mark"}]};
    } else {
      flashMessage("Loading theme 💾");
    };

    let indexedThemeInputs = this.inputTargets.reduce((previousValue, currentValue) => {
      previousValue[currentValue.id] = currentValue;
      return previousValue
    }, {});

    savedTheme["selectedValues"].forEach((savedComponent) => {
      let matchingTarget = indexedThemeInputs[savedComponent["id"]];
      matchingTarget.value = savedComponent["displayText"];
      matchingTarget.dataset.selectedEmoji = savedComponent["emoji"];
      matchingTarget.dispatchEvent(new Event("selected"))
    })

  }
}
