import "./lenis.scss";
import Lenis from "@studio-freight/lenis";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

"use strict";
var lenis;
function lenisScroll() {
    lenis = new Lenis({
        autoResize: true,
    });
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

export { lenis, lenisScroll }



/*

import { lenisScroll } from "./Module/lenis/lenis";
if (!isMobile()) lenisScroll();

*/