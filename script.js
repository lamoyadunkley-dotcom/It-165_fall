// Week 6 — 5-image slideshow (vanilla JavaScript)
const images = [
  "images/image1.svg",
  "images/image2.svg",
  "images/image3.svg",
  "images/image4.svg",
  "images/image5.svg"
];

const titles = [
  "Colorful Horizon",
  "Mountain Layers",
  "Ocean Geometry",
  "Desert Sunset",
  "Night Sky"
];

let currentIndex = 0;

const slideImage = document.getElementById("slide-image");
const slideCount = document.getElementById("slide-count");
const slideTitle = document.getElementById("slide-title");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const dots = document.querySelectorAll("#slide-dots button");

function showImage(index) {
  // Modulo arithmetic keeps the index within 0–4, including negative values.
  currentIndex = (index + images.length) % images.length;
  slideImage.src = images[currentIndex];
  slideImage.alt = `${titles[currentIndex]}, image ${currentIndex + 1} of ${images.length}`;
  slideCount.textContent = `Image ${currentIndex + 1} of ${images.length}`;
  slideTitle.textContent = titles[currentIndex];

  dots.forEach((dot, index) => {
    const isActive = index === currentIndex;
    dot.classList.toggle("active", isActive);
    if (isActive) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

previousButton.addEventListener("click", () => showImage(currentIndex - 1));
nextButton.addEventListener("click", () => showImage(currentIndex + 1));
dots.forEach((dot) => {
  dot.addEventListener("click", () => showImage(Number(dot.dataset.index)));
});

showImage(0);
