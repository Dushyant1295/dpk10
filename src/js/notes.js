/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  Vs Code shotcuts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Ctrl + W ==>  Close tab

*/



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               For Fancy Box
    <a href="vid-link"  data-fancybox> </a>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import "@fancyapps/ui/dist/fancybox.css";
import { Fancybox } from "@fancyapps/ui";
 

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               How to use Jquery
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import $ from "jquery";
const jQuery = $;



 

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               Gsap
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



gsap.config({
  force3D: true,
});







/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    Loaders
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


import { loader } from "./Module/loaders/loader";
import { loader } from "./Module/loaders/loader-svg";
loader();

import { progressLoading } from "./Module/loaders/progressLoader"
progressLoading();






/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      Lenis Scroll &  Gsap & ScrollTrigger
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


import { lenis, lenisScroll } from "./Module/lenis/lenis-scroll";
const lss = new lenisScroll();







/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      Contact Form Init on  barba
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 


function initBeforeEnter() {
  
  const cfForms = document.querySelectorAll(".wpcf7 form");
  if (cfForms.length > 0 && typeof wpcf7 !== "undefined" && typeof wpcf7.init === "function") {
    cfForms.forEach(function (form) {
      wpcf7.init(form);
    });
  }

}
