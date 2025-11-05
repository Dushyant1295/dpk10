import "./scrollTriggerAni.scss";


import { isMobile, select } from "../Helper";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let mmmd = gsap.matchMedia();

function simpleParalax() {
    const agse = document.querySelector(".agenda-section");

    if (!isMobile() && agse) {
        const cards = document.querySelectorAll(".wc-box");
        cards.forEach((card, index) => {
            gsap.to(card, {
                yPercent: (index + 1) * 20,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });
    }
}

function cardOverlap() {
   
    const details = gsap.utils.toArray(
        ".desktopContentSection:not(:first-child)"
    );
    const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)");

    gsap.set(photos, { yPercent: 101 });

    const allPhotos = gsap.utils.toArray(".desktopPhoto");

    ScrollTrigger.create({
        trigger: ".gallery",
        start: "top top",
        end: "bottom bottom",
        pin: ".right",
    });

    //create scrolltrigger for each details section
    //trigger photo animation when headline of each details section
    //reaches 80% of window height
    details.forEach((detail, index) => {
        let headline = detail.querySelector("h1");
        let animation = gsap
            .timeline()
            .to(photos[index], { yPercent: 0 })
            .set(allPhotos[index], { autoAlpha: 0 });
        ScrollTrigger.create({
            trigger: headline,
            start: "top 80%",
            end: "top 50%",
            animation: animation,
            scrub: true,
            markers: false,
        });
    });
}

export { simpleParalax, cardOverlap };
