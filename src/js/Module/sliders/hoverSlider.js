import "./hover-slider.scss";

import Swiper from "swiper/bundle";
import { select, getDirection } from "../Helper";

var hoverSlider;

function createhoverSlider(swiperEl) {
    hoverSlider = new Swiper(swiperEl, {
        direction: getDirection(),
        parallax: true,
        effect: "slide",
        
        speed: 800,
        breakpoints: {
            1024: {
                speed: 1000,
            },
        },

        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2,
        },
    });
}

function destroyhoverSlider() {
    hoverSlider.destroy();
}



const sliderP = document.querySelectorAll(".ttt a");
sliderP.forEach(function (v, i, a) {
    v.addEventListener("mouseenter", function () {
        hoverSlider.slideTo(i, 900, false);
    });
});







/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
       Create & Destroy Swiper On Barba View
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const hoverSliderView = {
    namespace: "hover-slider",

    afterEnter() {
        const hs = select(".hover-slider .swiper");
        createhoverSlider(hs);
    },

    afterLeave() {
        destroyhoverSlider();
    },
};
