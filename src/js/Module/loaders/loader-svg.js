import "./loader-svg.scss";
import { gsap } from "gsap";

function loader() {
  const loaderContainer = document.querySelector(".loader");
  if (loaderContainer) {

    // Can we do this with only css so the 2sec can be save
    const svgLogo = loaderContainer.querySelector("svg");
    
    const tl = gsap.timeline({ delay: 2.5 });

    tl.to(svgLogo, { opacity: 0, duration: 0.5, delay: 1 });

    tl.to(".loader", {
      scaleY: 0,
      transformOrigin: "top",
      ease: "power3.out",
      duration: 1,
    });

    tl.set(".loader", {
      display: "none",
    });
  }
}

export { loader };








/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      👉  include('./loader-svg.php')
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/