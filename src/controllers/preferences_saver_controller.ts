import { Controller } from "@hotwired/stimulus"
import { flashMessage } from "../lib/messages";
import { migrateTheme } from "../lib/theme_migrator";

export const THEMESTORAGEID = "savedTheme";
const THEME_VERSION = 2
const DEFAULT_THEME = { "version": THEME_VERSION, "selectedValues": [{ "id": "miss", "emoji": "🤏", "displayText": "🤏 pinching hand" }, { "id": "wrong", "emoji": "❌", "displayText": "❌ x" }, { "id": "hit", "emoji": "✅", "displayText": "✅ white check mark" }] };

export default class extends Controller {

  declare readonly inputTargets: Array<HTMLInputElement>;

  static targets = ["input"]

  connect() {
    this.populateTheme();
  }

  saveToPreferences() {
    let selectedThemeComponents = this.inputTargets.map((input) => {
      return { "id": input.id, "emoji": input.dataset.selectedEmoji, "displayText": input.value }
    });

    window.localStorage.setItem(THEMESTORAGEID, JSON.stringify({version: THEME_VERSION, selectedValues: selectedThemeComponents }));
    flashMessage("Saving theme 💾");
  }

  clearPreferences() {
    window.localStorage.removeItem(THEMESTORAGEID);
    flashMessage("Theme cleared 🗑");
  }

  isThemePresent() {
    let theme = JSON.parse(window.localStorage.getItem(THEMESTORAGEID) || "{}")
    return Object.entries(theme).length === 0;
  }

  loadFromPreferences() {
    let savedTheme = JSON.parse(window.localStorage.getItem(THEMESTORAGEID) || "{}");

    if (this.isThemePresent()) {
      savedTheme = DEFAULT_THEME;
    }

    return migrateTheme(savedTheme)
  }

  populateTheme() {
    let indexedThemeInputs = this.inputTargets.reduce((previousValue, currentValue) => {
      previousValue[currentValue.id] = currentValue;
      return previousValue
    }, {});

    this.loadFromPreferences()["selectedValues"].forEach((savedComponent) => {
      let matchingTarget = indexedThemeInputs[savedComponent["id"]];
      matchingTarget.value = savedComponent["displayText"];
      matchingTarget.dataset.selectedEmoji = savedComponent["emoji"];
      matchingTarget.dispatchEvent(new Event("selected"))
    })

    if (this.isThemePresent()) {
      flashMessage("Loading theme 💾");
    }
  }
}
