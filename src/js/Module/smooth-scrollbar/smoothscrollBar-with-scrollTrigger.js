import "./smooth-scrollbar.scss";
import { isMobile, select } from "../Helper";

import SmoothScrollbar from "smooth-scrollbar";
import ScrollTrigger from "gsap/ScrollTrigger";

import ScrollTriggerPlugin from "./ScrollTriggerPlugin";
import SoftScrollPlugin from "./SoftScrollPlugin";
SmoothScrollbar.use(SoftScrollPlugin);


ScrollTrigger.config({ ignoreMobileResize: true });

import { curtains } from "../curtain/effect4/curtainEffect";

var scroll; // 👉 Global variable scroll

function smooth(scrollContainer) {
    let currentScrollContainer = scrollContainer.querySelector(
        "[data-scroll-container]"
    );

    if (!isMobile()) {
        scroll = SmoothScrollbar.init(currentScrollContainer, {
            renderByPixels: true,
            damping: 0.08,
        });

        if (currentScrollContainer.querySelector(".plane")) {
            scroll.addListener((obj) => {
                curtains.updateScrollValues(obj.offset.x, obj.offset.y);
            });
        }

       const menuBar = select(".over > path");
        if (menuBar) {
            scroll.addListener((obj) => {
                const vProgress = (obj.offset.y / obj.limit.y) * 100;
                menuBar.style.strokeDashoffset = vProgress - 100;
            });
        }
    }
}

if (!isMobile()) {
    window.onresize = function (event) {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
    };
}

export { scroll, smooth };
