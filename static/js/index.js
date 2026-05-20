document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector("[data-figure-carousel]");
  const previousButton = document.querySelector("[data-carousel-prev]");
  const nextButton = document.querySelector("[data-carousel-next]");

  if (!carousel || !previousButton || !nextButton) {
    return;
  }

  const getScrollStep = () => {
    const card = carousel.querySelector(".figure-card");

    if (!card) {
      return carousel.clientWidth * 0.9;
    }

    const styles = window.getComputedStyle(carousel);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return card.getBoundingClientRect().width + gap;
  };

  const updateButtons = () => {
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    previousButton.disabled = carousel.scrollLeft <= 2;
    nextButton.disabled = carousel.scrollLeft >= maxScrollLeft - 2;
  };

  previousButton.addEventListener("click", () => {
    carousel.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    carousel.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  });

  let scheduled = false;
  carousel.addEventListener("scroll", () => {
    if (scheduled) {
      return;
    }

    scheduled = true;
    window.requestAnimationFrame(() => {
      updateButtons();
      scheduled = false;
    });
  });

  window.addEventListener("resize", updateButtons);
  updateButtons();
});
