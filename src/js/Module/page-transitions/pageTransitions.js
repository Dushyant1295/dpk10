import "./page-transitions.scss";
import gsap from "gsap";

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     Single Layer effect
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function pageLeave1(done) {
  let tl = gsap.timeline();
  tl.to(".singleLayer", {
    duration: 1.2,
    ease: "power2.inOut",
    scaleY: 1,
    transformOrigin: "top",
  });
  tl.from(
    ".singleLayer h1",
    {
      y: -100,
      opacity: 0,
      duration: 0.8,
      onComplete: () => done(),
    },
    "-=.4"
  );
}

function pageEnter1() {
  let tl = gsap.timeline();

  tl.to(".singleLayer h1", {
    y: 200,
    opacity: 0,
    ease: "power1.inOut",
    duration: 0.8,
    delay: 0.2,
  });

  tl.to(
    ".singleLayer",
    {
      duration: 1,
      ease: "power1.inOut",
      scaleY: 0,
      transformOrigin: "bottom",
    },
    "-=.3"
  );

  tl.set(".singleLayer h1", { y: 0, opacity: 1 });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     DA.cl Effect
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function pageLeave(done) {
  let tl = gsap.timeline();
  tl.to("ul.transition li", {
    duration: 0.25,
    scaleY: 1,
    transformOrigin: "bottom left",
    stagger: 0.1,
  });
  tl.from(".t-logo", { scale: 1.2, opacity: 0, onComplete: () => done() });
}

function pageEnter() {
  let tl = gsap.timeline();
  tl.to(".t-logo", { scale: 0.8, opacity: 0, delay: 0.7 });

  tl.to("ul.transition li", {
    duration: 0.35,
    scaleY: 0,
    transformOrigin: "bottom left",
    stagger: 0.1,
  });
  tl.set(".t-logo", { scale: 1, opacity: 1 });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      Barba Js
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function disappears(element, durations, done) {
  gsap.to(element, {
    autoAlpha: 0,
    duration: durations,
    ease: "expo.out",
    onComplete: () => done(),
  });
}

function appears(element, durations) {
  gsap.from(element, { opacity: 0, duration: durations, ease: "power2.in" });
}

export { pageEnter, pageLeave, disappears, appears };
