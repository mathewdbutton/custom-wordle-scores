import { Controller } from "@hotwired/stimulus"
import Emojis from "../emoji-reference.json"

export default class extends Controller {
  static targets = ["input", "result", "results"]

  initialize() {
    this.emojis = Emojis["emojis"]
  }

  select(event) {
    let selectResult = event.target;
    this.inputTarget.value = selectResult.innerText;
    this.inputTarget.dataset.selectedEmoji = selectResult.dataset.value
    this.inputTarget.dispatchEvent(new Event("selected"));
  }

  closeSearchResults() {
    this.resultsTarget.classList.replace("block", "hidden");
    this.resultTargets.forEach((result) => result.classList.replace("block", "hidden"));
  }

  search() {
    this.resultsTarget.appendChild(document.querySelector("#results-container"));
    const searchTerm = this.inputTarget.value.replaceAll(/[^a-zA-Z ]/g, "").trim(); // Filters out the emoji - This is really dumb
    let filteredFields = Array.from(document.querySelectorAll(`[data-search-term*='${searchTerm}']`));

    if (this.inputTarget.value === "" || filteredFields.length === 0) {
      this.closeSearchResults()
      return;
    }

    this.resultTargets.forEach((result) => {
      if (filteredFields.includes(result)) {
        result.classList.replace("hidden", "block")
      } else {
        result.classList.add("block", "hidden")
      }
    })
    this.resultsTarget.classList.replace("hidden", "block");
  }
}