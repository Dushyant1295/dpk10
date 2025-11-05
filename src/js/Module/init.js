import { initSlider } from "./sliders/slider";
import { initTabSlider } from "./sliders/tab-slider";
import { menu, menuClose, checkCurrentPage, menuAccordian } from "./menu/menu";
import { createLazyLoad, destroyLazyLoad } from "./animations/lazyLoad";
import { siteSearch } from "./site-search/site-search";
import { accordianView } from './components/accordian';
import { simpleParalax, cardOverlap} from './animations/scrollTriggerAni.js'
 

import { venoboxInit } from "./siteFun";


menu();

function init() {
    siteSearch();
    createLazyLoad();
    checkCurrentPage();
    initSlider();
    initTabSlider();
    menuAccordian();
    accordianView();
    venoboxInit();
    // simpleParalax();
    // cardOverlap();
}


function initBeforeEnter() {
    menuClose();
}

function destroyBeforeLeave() {
    destroyLazyLoad();
}

export { init, initBeforeEnter, destroyBeforeLeave };







 





/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 dpk Cursor Setup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


import dpkCursor from "./dpkCursor/dpkCursor";

let customCursor = null;
if (!isMobile()) {
    customCursor = new dpkCursor({ ease: .25, useGsap: true });
}

// inside init()
 customCursor?.effect();
 
// inside  initBeforeEnter()
 customCursor?.reset();

// inside destroyBeforeLeave()
customCursor?.cursor.classList.add("loading");


*/
