import "./slider.scss";
import Swiper from "swiper/bundle";

class Slider {
  constructor(el, slides) {
    this.el = el;
    this.slides = slides;
    this.slider = null;
    this.create();
  }

  create() {
    const next = this.el.querySelector(".next");
    const prev = this.el.querySelector(".prev");
    const paginationEl = this.el.querySelector(".swiper-pagination");

    this.slider = new Swiper(this.el, {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,

      breakpoints: {
        1024: {
          slidesPerView: this.slides,
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





var tabSlider;
function createtabSlider(swiperEl) {
  tabSlider = new Swiper(swiperEl, {
    slidesPerView: 1,
    speed: 600,
  });

  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      tabSlider.slideTo(index);
      buttons.forEach((btn) => {
        if (btn === button) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    });
  });
}


const tabVar = document.querySelector(".tab-slider .swiper");
if (tabVar) {
    createtabSlider(tabVar)
}

export { Slider };




/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    var swiperSliders = [];
    import { Slider } from "./sliders/slider";
 
    const sliders = document.querySelectorAll(".slider");

    sliders.forEach((slider, index) => {
        const sliderSwiper = slider.querySelector(".swiper");
        const slides = slider.getAttribute("data-slides");
        const slsw = new Slider(sliderSwiper, slides);
        swiperSliders.push(slsw);
    });
    
    swiperSliders.forEach(slider => {
        slider?.destroy();
    });
  
    swiperSliders.length = 0;
    
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/




/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 Tab Slider               
                  
<div class="tab-slider">
    <div class="tab-btns">
        <span class="tab-btn linehover active" data-index="0">Car</span>
        <span class="tab-btn linehover" data-index="1">Parking</span>
    </div>

    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
        </div>
    </div>
</div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

