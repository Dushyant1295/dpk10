import Swiper from "swiper/bundle";

var tabSlider;

function createtabSlider(tbs) {
    const sw = tbs.querySelector(".swiper");

    tabSlider = new Swiper(sw, {
        slidesPerView: 1,
        speed: 600,
        allowTouchMove: false
    });

    const buttons = tbs.querySelectorAll(".tab-btn");

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


function initTabSlider() {

    const tabVar = document.querySelector(".tab-slider");
    if (tabVar) {
        createtabSlider(tabVar)
    }
}
export { initTabSlider }







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
