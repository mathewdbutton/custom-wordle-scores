export function flashMessage(message, duration=200, target=document.querySelector("#flash-message")) {

  target.innerText = message;
  target.classList.add("opacity-100");
  target.classList.add("instant-transition");
  setTimeout(() => {
    target.classList.remove("instant-transition");
    target.classList.remove("opacity-100");
  },duration)
}
