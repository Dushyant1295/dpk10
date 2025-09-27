import { select } from "../Helper";

import "./gsap-debug.scss"


function gsapDebug(tweenObject) {
  const gsapTool = select(".gsapTool");
  if (gsapTool) {
    const play = select(".playbtn");
    const rev = select(".revbtn");
    const restart = select(".restart");

    var tl = tweenObject;

    play.addEventListener("click", () => {
      tl.paused(!tl.paused());
      if (tl.progress() == 1) {
        tl.restart();
      }
    });

    rev.addEventListener("click", () => {
      tl.reversed(!tl.reversed());
    });

    restart.addEventListener("click", () => {
      tl.restart();
    });

    slider.addEventListener("input", function () {
      tl.progress(this.value).pause();
    });
  }
}

function gsapDebugSlider() {
  const gsapTl = select(".gsapTool");
  if (gsapTl) {
    const slider = select("#slider");
    const time = select("#time");
    slider.value = this.progress();
    time.innerHTML = this.time().toFixed(2);
  }
}

export { gsapDebug, gsapDebugSlider };





/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      How to use 👇
      let tl = gsap.timeline({onUpdate: gsapDebugSlider})
                   👉 gsapDebug(tl);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
