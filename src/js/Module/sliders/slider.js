import "./slider.scss";
import Swiper from "swiper/bundle";

class Slider {
  constructor(el, slides,sp) {
    this.el = el;
    this.slides = slides || 3;
    this.space = sp || 20;
    this.slider = null;
    this.create();
  }

  create() {
    const next = this.el.querySelector(".next");
    const prev = this.el.querySelector(".prev");
    const paginationEl = this.el.querySelector(".swiper-pagination");

    this.slider = new Swiper(this.el, {
      slidesPerView: 1,
      spaceBetween: this.space,
      speed: 600,

      breakpoints: {
        1024: {
          slidesPerView: this.slides,
        },
        768: {
          slidesPerView: this.slides - 1,
        },
      },

      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2,
      },

      navigation: {
        nextEl: next,
        prevEl: prev,
      },

      pagination: {
        el: paginationEl,
        type: "bullets",
        clickable: false,
      },
    });
  }

  destroy() {
    if (this.slider) {
      this.slider.destroy();
      this.slider = null;
    }
  }
}

var swiperSliders = [];

function initSlider() {
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach((slider) => {
    const sliderSwiper = slider.querySelector(".swiper");
    const slides = slider.getAttribute("data-slides");
    const space = slider.getAttribute("data-space");
    const slsw = new Slider(sliderSwiper, slides, space);
    swiperSliders.push(slsw);
  });

  
}

function destroySlider() {
  swiperSliders.forEach((slider) => {
    slider?.destroy();
  });
  swiperSliders.length = 0;
}

export { Slider, initSlider, destroySlider };
