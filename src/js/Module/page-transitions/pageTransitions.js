import gsap from "gsap";

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







function disappears1(element, durations, done) {
  setTimeout(() => {     done()   }, 1000);
}

function appears1(element, durations) {
  
}




export { appears, disappears };
