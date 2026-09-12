// The hero blueprint animation is CSS-only (see .draw-path in styles.css).

// Hero diagram: reveal the checkmark only when the travel dot truly
// finishes its motion down to the last node — no guessed timers.
(function () {
  const motion = document.getElementById("travelMotion");
  const finishMark = document.getElementById("finishMark");
  const dot = document.getElementById("travelDot");
  if (!motion || !finishMark) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Skip the travel animation and just show the completed state.
    if (dot) dot.style.display = "none";
    finishMark.classList.add("is-marked");
    return;
  }

  motion.addEventListener("endEvent", function () {
    finishMark.classList.add("is-marked");
  });
})();

// Rotating word in the hero headline: "We architect the ___ your business runs on."
(function () {
  const words = ["systems", "websites", "software", "automations"];
  const el = document.getElementById("rotator");
  if (!el) return;

  let index = 0;

  setInterval(function () {
    index = (index + 1) % words.length;

    const outgoing = el.querySelector(".rotator-word");
    const incoming = document.createElement("span");
    incoming.className = "rotator-word is-entering";
    incoming.textContent = words[index];

    el.appendChild(incoming);
    if (outgoing) outgoing.classList.add("is-leaving");

    // Next frame: trigger the transition
    requestAnimationFrame(function () {
      incoming.classList.add("is-active");
      incoming.classList.remove("is-entering");
    });

    // Clean up the old word once its transition finishes
    setTimeout(function () {
      if (outgoing) outgoing.remove();
    }, 500);
  }, 2200);
})();

// Portfolio category filters
(function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".portfolio-card");
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");

      const filter = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        const match = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });
})();
