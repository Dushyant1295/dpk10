import "./text-animations.scss";
import gsap from "gsap";

function charSplit() {
  document.querySelectorAll(".char-split").forEach((parentElement) => {
    const childElement = parentElement.firstElementChild;

    if (childElement) {
      const clone1 = childElement.cloneNode(true);
      const clone2 = childElement.cloneNode(true);

      clone1.setAttribute("data-splitting", "");
      clone2.setAttribute("data-splitting", "");

      parentElement.replaceChildren(clone1, clone2);
    }
  });
}



export { charSplit };
