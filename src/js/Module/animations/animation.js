import "./gsap-effects.scss";
import Splitting from "splitting";

import gsap from "gsap";
import { gsapDebug, gsapDebugSlider } from "./gsapDebug";

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 1. Text Scramble
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function textScramble(el) {
  const scrmbleSpan = el.querySelectorAll("span");
  const scrmbleSpanNot = el.querySelectorAll('span:not([data-char="."]');

  gsap.set(scrmbleSpan, { yPercent: -103, autoAlpha: 1 });

  const tl = gsap.timeline();

  tl.to(scrmbleSpan, {
    duration: 1,
    yPercent: 0,
    stagger: 0.05,
    ease: "expo.inOut",
  });

  tl.to(scrmbleSpanNot, {
    duration: 1,
    yPercent: 103,
    stagger: 0.1,
    ease: "expo.inOut",
  });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 2. Text Appear Y
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function appearY(el) {
  const tl = gsap.timeline();
  const span = el.querySelectorAll("span");
  const duration = el.getAttribute("data-duration");

  tl.from(span, {
    autoAlpha: 0,
    yPercent: 130,
    stagger: 0.2,
    duration: duration,
    ease: "power2.out",
  });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 2. GROW BOTTOM
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function growB(el) {
  const tl = gsap.timeline();

  const span = el.querySelectorAll("span");

  tl.to(span, {
    rotateX: 0,
    y: 0,
    x: 0,
    opacity: 1,
    stagger: 0.06,
    duration: 0.8,
    ease: "power3.inOut",
  });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 d text
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function dtextAni(el) {
  const chars = el.querySelectorAll(".content__title .char");

  gsap.set(chars, {
    "will-change": "opacity, transform",
    opacity: 0,
    xPercent: () => gsap.utils.random(-200, 200),
    yPercent: () => gsap.utils.random(-150, 150),
  });

  gsap.to(chars, {
    ease: "power1.inOut",
    opacity: 1,
    xPercent: 0,
    yPercent: 0,
    duration: 0.7,
    stagger: { each: 0.05, grid: "auto", from: "random" },
  });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 d text
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function dtextAni2(el) {
  const words = el.querySelectorAll(".dtext2 .word");
  words.forEach((word) => {
    const chars = word.querySelectorAll(".char");

    gsap.set(chars[0].parentNode, { perspective: 1000 });
    gsap.set(chars, {
      "will-change": "opacity, transform",
      opacity: 0,
      rotationX: -90,
      yPercent: 50,
    });
    gsap.to(chars, {
      ease: "power1.inOut",
      opacity: 1,
      duration: 0.8,
      delay: 0.1,
      rotationX: 0,
      yPercent: 0,
      stagger: {
        each: 0.03,
        from: 0,
      },
    });
  });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 d text 3
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function dtextAni3(el) {
  const tl = gsap.timeline({ onUpdate: gsapDebugSlider });
  gsapDebug(tl);

  const chars = el.querySelectorAll(".dtext3 .char");

  tl.set(chars, {
    "will-change": "opacity",
    opacity: 0,
    filter: "blur(20px)",
  });

  tl.to(chars, {
    duration: 0.35,
    ease: "power2.out",
    opacity: 1,
    filter: "blur(0px)",
    stagger: { each: 0.05, from: "random" },
  });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 d text 7
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function appearTitle() {
  const titles = document.querySelectorAll('[data-dpk-call="appearTitle"]');

  titles.forEach((title) => {
    const revealText = title.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const results = Splitting({
      target: revealText,
      by: "lines",
      // whitespace: false
      // key: null,
    });

    results.forEach((splitResult) => {
      const wrappedLines = splitResult.lines
        .map((wordsArr) => {
          const wrappedWords = wordsArr
            .map((word) => `${word.outerHTML}<span> </span>`)
            .join("");
          return `<div class="lines"><div class="words">${wrappedWords}</div></div>`;
        })
        .join("");

      splitResult.el.innerHTML = wrappedLines;
    });
  });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    Paragraph Reveal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function paraReveal(el) {
  let animEl = [];

  for (let i = 2; i <= 6; i++) {
    let heading = el.querySelector(`h${i}`);
    if (heading !== null) {
      animEl.push(heading);
    }
  }

  let para = el.querySelectorAll("p");
  if (para.length > 0) {
    animEl.push(...para);
  }

  let btn = el.querySelector(".btn-1");
  if (btn !== null) {
    animEl.push(btn);
  }

  let tl = gsap.timeline({ delay: 0.2 });

  tl.from(animEl, {
    autoAlpha: 0,
    yPercent: 60,
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.15,
  });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 Image Reveal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function imgReveal(el, dur) {
  let re = el.querySelector(".reveal");
  let image = el.querySelector(".reveal img");

  let tl = gsap.timeline({ delay: 0.2 });

  tl.set(re, { autoAlpha: 1 });

  tl.from(re, {
    duration: dur,
    yPercent: -100,
    ease: "power2.out",
  });

  tl.from(image, {
    duration: dur,
    yPercent: 100,
    scale: 1.3,
    delay: -dur,
    ease: "power2.out",
  });
}

export {
  appearTitle,
  textScramble,
  appearY,
  growB,
  dtextAni,
  dtextAni2,
  dtextAni3,
  paraReveal,
  imgReveal,
};
