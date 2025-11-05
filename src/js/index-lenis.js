import "../css/style.scss";
import "swiper/css/bundle";

import barba from "@barba/core";
import barbaPrefetch from "@barba/prefetch";
import { isMobile } from "./Module/Helper";

import { appears, disappears } from "./Module/page-transitions/pageTransitions";
import { init, initBeforeEnter, destroyBeforeLeave } from "./Module/init";

import { lenis, lenisScroll } from "./Module/lenis/lenis";
const lss = new lenisScroll();

barba.use(barbaPrefetch);

barba.init({
  schema: { prefix: "data-barba" },
  debug: true,
  preventRunning: true,

  transitions: [
    {
      name: "dpk-transition",

      once({ next }) {
        if (!isMobile()) lss.initLenis();
        init();
      },

      beforeEnter({ next }) {
        if (!isMobile()) lss.initLenis();
        initBeforeEnter();
      },

      enter({ next }) {
        if (isMobile()) {
          setTimeout(() => {
            document.documentElement.style.scrollBehavior = "smooth";
          }, 3000);
        }
        window.scrollTo(0, 0);
        appears(next.container, 0.4);
      },

      after() {
        init();
      },

      beforeLeave() {
        destroyBeforeLeave();
        if (isMobile()) {
          document.documentElement.style.scrollBehavior = "auto";
        }
      },

      async leave(data) {
        const done = this.async();
        disappears(data.current.container, 0.6, done);
      },

      afterLeave() {
        if (!isMobile()) lss.killLenis();
      },
    },
  ],
});
