import LazyLoad from "vanilla-lazyload";
import {
    paraReveal,
    imgReveal
} from "./animation";

 
var lazyObj;

function createLazyLoad() {
    lazyObj = new LazyLoad({
        elements_selector: "[data-dpk-call]",
        thresholds: "0% 0% -15% 0%",
        unobserve_entered: true, // fn execute only once
        callback_enter: executeLazyFunction,
    });
}

function destroyLazyLoad() {
    lazyObj.destroy();
}

function executeLazyFunction(element) {
    const funName = element.getAttribute("data-dpk-call");
    const lazyFunction = window.lazyFunctions[funName];
    if (!lazyFunction) return;
    lazyFunction(element);
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     Lazy Functions will invoded on  Viewport
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

window.lazyFunctions = {
    paraR(el) {
        paraReveal(el);
    },
    imgR(el) {
        imgReveal(el, 2);
    },
};

export { createLazyLoad, destroyLazyLoad };
