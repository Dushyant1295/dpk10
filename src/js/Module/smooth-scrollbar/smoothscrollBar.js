import "./smooth-scrollbar.scss";

import { isMobile, select } from "../Helper";
import SmoothScrollbar from "smooth-scrollbar";

import HorizontalScrollPlugin from "./HorizontalScrollPlugin";
import SoftScrollPlugin from "./SoftScrollPlugin";
SmoothScrollbar.use(SoftScrollPlugin, HorizontalScrollPlugin);

// import { curtains } from "../curtain/Effect4/curtainEffect";

var scroll;

function smooth(sContainer) {
    const currentScrollContainer = sContainer.querySelector(
        "[data-scroll-container]"
    );
    const hScroll = sContainer.querySelector("[data-horizontal]");

    scroll = SmoothScrollbar.init(currentScrollContainer, {
        renderByPixels: true,
        damping: 0.075,
        plugins: {
            horizontalScroll: hScroll ? true : false,
        },
    });


    scroll.addListener((obj) => {
        const vProgress = ((obj.offset.y / obj.limit.y) * 100).toFixed(2);
        console.log(vProgress);

    });

    // if (currentScrollContainer.querySelector(".plane")) {
    //     scroll.addListener((obj) => {
    //         curtains.updateScrollValues(obj.offset.x, obj.offset.y);
    //     });
    // }


    const menuBar = select(".over > path");
    if (menuBar) {
        scroll.addListener((obj) => {
            const vProgress = ((obj.offset.y / obj.limit.y) * 100).toFixed(2);
            menuBar.style.strokeDashoffset = vProgress - 100;
        });
    }

    /*
    const links = document.querySelectorAll("header a[href]");
    if (links) {
        links.forEach((element) => {
            element.addEventListener("click", () => {
                const href = element.getAttribute('href');
                const target = document.querySelector(href);
                if (target) {  scroll.scrollIntoView(target)  }
            });
        });
    }
    */



}

export { scroll, smooth };



















/*
import DisableScrollPlugin from "./disableScrollPlugin";
import  AnchorPlugin  from "./AnchorPlugin";


 scroll.addListener(({ offset }) => {
            if (!lastOffset) {
                lastOffset = offset;
                return;
            }

            const dir = [];

            if (offset.y < lastOffset.y) {
                dir[0] = 'up';
            } else if (offset.y > lastOffset.y) {
                dir[0] = 'down';
            } else {
                dir[0] = 'still';
            }

            lastOffset = offset;

            switch (dir[0]) {
                case 'up':
                    console.log("up")
                    break;
                case 'down':
                    console.log("down")
                    break;
                case 'still':
                    console.log("stoped")
                    break;
            }

        });



*/
