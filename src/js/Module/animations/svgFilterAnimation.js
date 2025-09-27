import "./svgFilterAni.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


class svgFilterAni {
    DOM = {
        el: null,
        titleWrap: null,
        titleUp: null,
        titleDown: null,
        content: null,
        svg: null,
        mask: null,
        image: null,
    };

    flipstate = null;

    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.content = [...this.DOM.el.querySelectorAll(".content")];
        this.DOM.svg = this.DOM.el.querySelector(".content__img");
        this.DOM.mask = this.DOM.svg.querySelector(".mask");
        this.DOM.image = this.DOM.svg.querySelector("image");

        const isCircle = this.DOM.mask.tagName.toLowerCase() === "circle";

        const tl = gsap.timeline();

        tl.fromTo(
            this.DOM.mask,
            {
                attr: isCircle
                    ? { r: this.DOM.mask.getAttribute("r") }
                    : { d: this.DOM.mask.getAttribute("d") },
            },
            {
                ease: "none",
                attr: isCircle
                    ? { r: this.DOM.mask.dataset.valueFinal }
                    : { d: this.DOM.mask.dataset.valueFinal },
            },
            0
        ).fromTo(
            this.DOM.image,
            {
                transformOrigin: "50% 50%",
                filter: "brightness(100%)",
            },
            {
                ease: "none",
                scale: isCircle ? 1.2 : 1,
                filter: "brightness(150%)",
            },
            0
        );

        ScrollTrigger.create({
            trigger: this.DOM.el,
            ease: "none",
            start: "-=80%",
            end: "+=40%",
            scrub: 1.5,
            animation: tl,
        });
    }
}

export { svgFilterAni };




// Html Structure 👇








/*

<div class="content-wrap border">
			<div class="content content--layout content--layout-1">
				<svg class="content__img content__img--1" width="896" height="1344" version="1.1"
					xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 896 1344">
					<defs>
						<filter id="displacementFilter">
							<feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
							<feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R"
								yChannelSelector="G" />
						</filter>
						<mask id="circleMask">
							<circle cx="50%" cy="50%" r="0" data-value-final="820" fill="white" class="mask"
								style="filter: url(#displacementFilter)" />
						</mask>
					</defs>
					<image xlink:href="img/1.jpg" width="896" height="1344" mask="url(#circleMask)" />
				</svg>
			</div>
		</div>

		<div style="height: 100vh"></div>

		<div class="content-wrap border">
			<div class="content content--layout content--layout-6">
				<svg class="content__img content__img--6" width="1000" height="1000" version="1.1"
					xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 1000 1000">
					<defs>
						<filter id="displacementFilter6">
							<feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
							<feDisplacementMap in="SourceGraphic" in2="noise" result="displacement" scale="150"
								xChannelSelector="R" yChannelSelector="G" />
							<feGaussianBlur in="displacement" stdDeviation="10" />
						</filter>
						<mask id="circleMask6">
							<circle cx="50%" cy="50%" r="0" data-value-final="720" fill="white" class="mask"
								style="filter: url(#displacementFilter6)" />
						</mask>
					</defs>
					<image xlink:href="img/6.jpg" width="1000" height="1000" mask="url(#circleMask6)" />
				</svg>
			</div>
		</div>

		<div style="height: 100vh"></div>

		<div class="content-wrap border">
			<div class="content content--layout content--layout-1">
				<svg class="content__img content__img--1" width="896" height="1344" version="1.1"
					xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 896 1344">
					<defs>
						<filter id="displacementFilter1">
							<feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
							<feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R"
								yChannelSelector="G" />
						</filter>
						<mask id="circleMask1">
							<circle cx="50%" cy="50%" r="0" data-value-final="820" fill="white" class="mask"
								style="filter: url(#displacementFilter1)" />
						</mask>
					</defs>
					<image xlink:href="img/1.jpg" width="896" height="1344" mask="url(#circleMask1)" />
				</svg>
			</div>
		</div>

*/ 