import "../css/style.scss";
import 'swiper/css/bundle';


import barba from "@barba/core";
import barbaPrefetch from "@barba/prefetch";

import { isMobile } from "./Module/Helper";


import { appears, disappears } from "./Module/page-transitions/pageTransitions"
import { init, initBeforeEnter, destroyBeforeLeave } from "./Module/init";
import { scroll, smooth } from "./Module/smooth-scrollbar/smoothscrollBar";
 

barba.use(barbaPrefetch);

barba.init({
  schema: { prefix: "data-barba" },
  debug: true,
  preventRunning: true,

  transitions: [
    {
      name: "dpk-transition",

      once({ next }) {
        if (!isMobile()) smooth(next.container);
        init();
      },

      beforeEnter({ next }) {
        if (!isMobile()) smooth(next.container);
        initBeforeEnter();
      },

      enter({ next }) {
        appears(next.container, 0.4);
      },

      after() {
        init();
      },

      beforeLeave() {
        destroyBeforeLeave();
      },

      async leave(data) {
        const done = this.async();
        disappears(data.current.container, 0.6, done);
      },

      afterLeave() {
        if (!isMobile()) scroll.destroy();
      }
    },
  ],
});
 