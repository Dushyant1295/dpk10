import "./lenis.scss";
import Lenis from "@studio-freight/lenis";
import { isMobile } from "../Helper";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


"use strict";


var lenis = !isMobile()
    ? new Lenis({

    })
    : null;

if (lenis) {
    lenis.stop();
}

class lenisScroll {
    constructor() {
        this.rafLenis = this.rafLenis.bind(this);
    }

    killLenis() {
        window.scrollTo(0, 0);
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
            lenis.stop();
            gsap.ticker.remove(this.rafLenis);

            ScrollTrigger.killAll();
            ScrollTrigger.clearScrollMemory();
        }
    }

    initLenis() {
        if (lenis) {
            gsap.ticker.add(this.rafLenis);
            lenis.start();
            lenis.on('scroll', ScrollTrigger.update)
        }
    }

    rafLenis(time, dt) {
        lenis.raf(time * 1000);
    }
}










export { lenis, lenisScroll };
