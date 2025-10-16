import "../css/style.scss";
import "swiper/css/bundle";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { isMobile } from "./Module/Helper";

import { lenis, lenisScroll } from "./Module/lenis/lenis";
const lss = new lenisScroll();

if (!isMobile()) lss.initLenis();

//loading effect
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  const content = document.querySelector(".main-content");

  // Wait for 2 seconds, then hide loader
  setTimeout(() => {
    loader.classList.add("hide");
    content.classList.add("show");
  }, 2000);
});

//scroll indicator effect
const sections = document.querySelectorAll("section");
const indicators = {
  "section-1": document.getElementById("indi-1"),
  "section-2": document.getElementById("indi-2"),
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove active from all indicators
        Object.values(indicators).forEach((el) =>
          el.classList.remove("active")
        );

        // Add active to the indicator for the visible section
        const currentId = entry.target.id;
        indicators[currentId].classList.add("active");
      }
    });
  },
  { threshold: 0.6 }
);

sections.forEach((section) => observer.observe(section));
