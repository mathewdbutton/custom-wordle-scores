import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "message"]

  copyToClipboard() {
    navigator.clipboard.writeText(this.inputTarget.value)
    this.messageTarget.classList.add("opacity-100");
    this.messageTarget.classList.add("instant-transition");
    setTimeout(() => {
      this.messageTarget.classList.remove("instant-transition");
      this.messageTarget.classList.remove("opacity-100");
    },100)
  }
}
