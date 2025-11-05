import LazyLoad from "vanilla-lazyload";


var lzr;

function createLazyLoadRepeat() {
    lzr = new LazyLoad({
        elements_selector: "[data-dpk-call-repeat]",
        thresholds: "0% 0% 0% 0%",
        unobserve_entered: false, 
        callback_enter: executeLazyRepeatFunction,
    });
}

function destroyLazyLoadRepeat() {
    lzr.destroy();
}

function executeLazyRepeatFunction(element) {
    const funName = element.getAttribute("data-dpk-call-repeat");
    const lzfun = window.lazyRepeatFunctions[funName];
    if (!lzfun) return;
    lzfun(element);
}






/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     Lazy Functions will invoded on  Viewport
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const deskHeader = document.querySelector("header");

window.lazyRepeatFunctions = {
    up() {
        deskHeader.classList.add("top");
        deskHeader.classList.remove("down");
    },
    down() {
        deskHeader.classList.add("down");
        deskHeader.classList.remove("top");
    }
};

export { createLazyLoadRepeat, destroyLazyLoadRepeat };
