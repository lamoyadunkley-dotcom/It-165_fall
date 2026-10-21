# Week 6 — CSS Effects & JavaScript Slideshow

## Contents
- `index.html` — page structure and sections for assignments 4.1–4.4
- `styles.css` — 0.3s card transitions, translateY movement, scale(1.02), elevation shadows, and keyframes at 0%, 50%, and 100%
- `script.js` — five-image slideshow with next/previous controls, dot navigation, and wrap-around index arithmetic
- `images/` — five included SVG image assets
- `LWD_JavaScript_ASSIGNMENT_NOTE.md` — reminder about the course reading document

## Run locally
Open `index.html` in a modern browser. No build tools or libraries are required.

## Slideshow wrap-around
The index is calculated with `(index + images.length) % images.length`. With five images, moving forward from index 4 returns to index 0, and moving backward from index 0 returns to index 4.

## Reading assignment
The course document `LWD_JavaScript` was not supplied with the available files. Add the original instructor-provided document to this folder before submitting if your instructor expects it in the repository.

## GitHub upload
Create a folder named `Week6` in your repository and upload the contents of this folder, including the complete `images/` directory and the reading assignment when available.
