export function flashMessage(message:string, duration=200, target:(HTMLElement | null)=document.querySelector("#flash-message")) {
  if (target === null) return;
  target.innerHTML = message;
  target.classList.add("opacity-100");
  target.classList.add("instant-transition");
  setTimeout(() => {
    target.classList.remove("instant-transition");
    target.classList.remove("opacity-100");
  },duration)
}
