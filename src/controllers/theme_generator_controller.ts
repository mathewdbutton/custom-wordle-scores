import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "output", "miss", "wrong", "hit"]

  declare readonly inputTarget: HTMLInputElement;
  declare readonly missTarget: HTMLInputElement;
  declare readonly hitTarget: HTMLInputElement;
  declare readonly wrongTarget: HTMLInputElement;
  declare readonly outputTarget: HTMLInputElement;

  connect() {
    this.change();
  }

  change() {
    let inputScore = this.inputTarget.value;
    if (inputScore === "") {
      return;
    }
    let legend =
      `\n\n${this.wrongTarget.dataset.selectedEmoji}=⬛ ${this.missTarget.dataset.selectedEmoji}=🟨 ${this.hitTarget.dataset.selectedEmoji}=🟩`;
    this.outputTarget.value = inputScore
      .replaceAll("⬛", this.wrongTarget.dataset.selectedEmoji)
      .replaceAll("🟨", this.missTarget.dataset.selectedEmoji)
      .replaceAll("🟩", this.hitTarget.dataset.selectedEmoji) + legend;
  }
}
