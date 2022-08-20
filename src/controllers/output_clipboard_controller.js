import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]

  connect() {

  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.inputTarget.value)
  }
}
