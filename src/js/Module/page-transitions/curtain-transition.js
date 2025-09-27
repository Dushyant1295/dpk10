import "./curtain-transition.scss";
import gsap from "gsap";

function pageLeave(done) {
  let tl = gsap.timeline();
  tl.to("ul.transition li", {
    duration: 0.5,
    scaleY: 1,
    transformOrigin: "bottom left",
    stagger: 0.1,
  });
  tl.from(".t-logo", { scale: 1.1, opacity: 0, onComplete: () => done() });
}

function pageEnter() {
  let tl = gsap.timeline();
  tl.to(".t-logo", { scale: 0.8, opacity: 0, delay: 0.7 });

  tl.to("ul.transition li", {
    duration: 0.7,
    scaleY: 0,
    transformOrigin: "bottom left",
    stagger: 0.1,
    ease: "power1.out",
    delay: 0.5,
  });
  tl.set(".t-logo", { scale: 1, opacity: 1 });
}

export { pageEnter, pageLeave };













/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                          HTML
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                   
        <ul class="transition">
          <li class="h-sm"></li>
          <li class="h-sm"></li>
          <li class="h-sm flex-center">
            <svg class="t-logo">
              <use xlink:href="img/icon.svg#dpk" />
            </svg>
          </li>
          <li class="h-sm"></li>
          <li class="h-sm"></li>
        </ul>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
                            JS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


import { pageEnter, pageLeave } from "./Module/page-transitions/curtain-transition"   



      // inside BARBA

        enter({ next }) {
             pageEnter(); 
        },

         async leave(data) {
           const done = this.async();
           pageLeave(done)
        },
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
