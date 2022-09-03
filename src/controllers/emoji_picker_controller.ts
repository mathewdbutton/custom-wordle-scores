import { Controller } from "@hotwired/stimulus"
import emojis from "../filtered_emoji_list.json"

export default class extends Controller {
  static targets = ["input", "result", "results"]

  declare readonly inputTarget: HTMLInputElement;
  declare readonly resultTargets: HTMLInputElement[];
  declare readonly resultsTarget: HTMLInputElement;


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
    this.destroyResults();
    this.resultsTarget.appendChild(document.querySelector("#results-container"));
    const searchIndex = Object.keys(emojis)
    const searchTerm = this.inputTarget.value.replaceAll(/[^a-zA-Z ]/g, "").trim().toLowerCase();
    const filteredSearchIndex = searchIndex.filter((emojiName) => {
      return emojiName.includes(searchTerm)
    }).slice(0,50)

    if (this.inputTarget.value === "" || filteredSearchIndex.length === 0) {
      this.closeSearchResults()
      return;
    }

    filteredSearchIndex.forEach((emojiName) => {
      const emoji = emojis[emojiName];

      this.createResult(emojiName, emoji["emoji"])
    })

    this.resultsTarget.classList.replace("hidden", "block");
  }

  createResult(searchTerm, value) {
    const template = document.getElementById('emoji-result-template');
    if (!(template instanceof HTMLTemplateElement)) {
      return
    }
    const clone = template.content.firstElementChild.cloneNode(true) as HTMLElement
    clone.dataset.searchTerm = searchTerm
    clone.dataset.value = value
    clone.innerText = `${value} ${searchTerm}`
    document.getElementById("results-container").appendChild(clone);
  }

  destroyResults() {
    document.getElementById("results-container").replaceChildren();
  }
}