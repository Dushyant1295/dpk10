import "./lenis.scss";
import { isTouch } from "../Helper";

import Lenis from "@studio-freight/lenis";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);






"use strict";

function lenisScroll() {
    const lenis = new Lenis({
        autoResize: true,
    });
 
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1002);
    });
    gsap.ticker.lagSmoothing(0);

}

export { lenisScroll }

