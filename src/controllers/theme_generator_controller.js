import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "output","miss","wrong","hit"]

  connect() {
    this.change();
  }

  change() {
    let inputScore = this.inputTarget.value;
    if (inputScore === "") {
      return;
    }
    let legend =
      `\n\n${this.wrongTarget.value}=⬛ ${this.missTarget.value}=🟨 ${this.hitTarget.value}=🟩`;
    this.outputTarget.value = inputScore
      .replaceAll("⬛", this.wrongTarget.value)
      .replaceAll("🟨", this.missTarget.value)
      .replaceAll("🟩", this.hitTarget.value) + legend;
  }
}
