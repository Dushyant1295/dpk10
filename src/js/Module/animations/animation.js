import "./gsap-effects.scss";
import gsap from "gsap";

 
 
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
  paraReveal,
  imgReveal,
};
