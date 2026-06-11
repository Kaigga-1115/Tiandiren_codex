const cursor = document.querySelector(".pokeball-cursor");

if (cursor) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll("a, button, .card, .record").forEach((element) => {
    element.addEventListener("pointerenter", () => cursor.classList.add("is-hover"));
    element.addEventListener("pointerleave", () => cursor.classList.remove("is-hover"));
  });

  window.addEventListener("pointerleave", () => {
    cursor.style.opacity = "0";
  });

  window.addEventListener("pointerenter", () => {
    cursor.style.opacity = "0.8";
  });
}
