import { Controller } from "@hotwired/stimulus"
import emojiReference from "../emoji-reference.json"

export default class extends Controller {
  static targets = ["input"]

  connect() {
    this.element.value = `${this.element.dataset.selectedEmoji}`
    console.log("SUP")
  }
}
