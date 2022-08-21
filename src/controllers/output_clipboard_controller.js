import { Controller } from "@hotwired/stimulus"
import { flashMessage } from "../lib/messages"

export default class extends Controller {
  static targets = ["input", "message"]

  copyToClipboard() {
    navigator.clipboard.writeText(this.inputTarget.value)
    flashMessage("Copying to clipboard 📋");
  }
}
