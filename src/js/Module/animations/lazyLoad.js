import LazyLoad from "vanilla-lazyload";

import {
    textScramble,
    appearY,
    growB,
    dtextAni,
    dtextAni2,
    dtextAni3,
    paraReveal,
    imgReveal,
} from "./animation";



let lazyObj;

const lazyFunctions = {
    textScr: (el) => textScramble(el),
    appearY: (el) => appearY(el),
    growB: (el) => growB(el),
    dtext: (el) => dtextAni(el),
    dtext2: (el) => dtextAni2(el),
    dtext3: (el) => dtextAni3(el),
    paraR: (el) => paraReveal(el),
    imgR: (el) => imgReveal(el, 2),
};

function createLazyLoad() {
    lazyObj = new LazyLoad({
        elements_selector: "[data-dpk-call]",
        rootMargin: "0px 0px -15% 0px", // LTBR
        unobserve_entered: true,
        callback_enter: executeLazyFunction,
    });
}


function destroyLazyLoad() {
    if (lazyObj) {
        lazyObj.destroy();
        lazyObj = null;
    }
}



/**
 * Execute the lazy function associated with the element
 * @param {HTMLElement} element - The DOM element to process
 */

function executeLazyFunction(element) {
    const funName = element.getAttribute("data-dpk-call");
    if (!funName) {
        // console.warn("No lazy function specified for element:", element);
        return;
    }

    const lazyFunction = lazyFunctions[funName];
    if (lazyFunction) {
        try {
            lazyFunction(element);
        } catch (error) {
            console.error(`Error executing lazy function "${funName}":`, error);
        }
    } else {
        console.warn(`Lazy function "${funName}" not found for element:`, element);
    }
}




export { createLazyLoad, destroyLazyLoad };
