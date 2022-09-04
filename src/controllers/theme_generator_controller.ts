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

    let legend = `\n\n${this.wrongInput()}=⬛ ${this.missInput()}=🟨 ${this.hitInput()}=🟩`;
    this.outputTarget.value = inputScore
      .replaceAll(/⬛|⬜/g, this.wrongInput())
      .replaceAll("🟨", this.missInput())
      .replaceAll("🟩", this.hitInput()) + legend;
  }

  wrongInput() {
    return this.wrongTarget.dataset.selectedEmoji
  }
  missInput() {
    return this.missTarget.dataset.selectedEmoji
  }
  hitInput() {
    return this.hitTarget.dataset.selectedEmoji
  }

}
