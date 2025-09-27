import "./locomotive.scss";
import "./locoEffects.scss";
import "./loco-bar.scss";
import "./loco-horizontal.scss";



import LocomotiveScroll from "locomotive-scroll";
const imagesLoaded = require("imagesloaded");


import { isMobile, select, map, clamp } from "../Helper";
import { curtains } from "../curtain/effect4/curtainEffect";



var scroll; // 👉 Global variable scroll 


function smooth(scrollContainer) {
    let currentScrollContainer = scrollContainer.querySelector("[data-scroll-container]");

    let options = {
        el: currentScrollContainer,
        smooth: true,
        // lerp: 0.09,
        getSpeed: true,
        getDirection: true,
    };

    if (currentScrollContainer.getAttribute("data-horizontal") == "true") {
        options.direction = "horizontal";
        options.gestureDirection = "both";
        options.smartphone = { smooth: false };
        options.reloadOnContextChange = true;
    }

    scroll = new LocomotiveScroll(options);





    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         Update scroll height when all images loaded 
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    imagesLoaded(currentScrollContainer, { background: true }, function () {
        setTimeout(() => { scroll.update() }, 300)
    });






    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  Scroll Direction Up Down 
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    scroll.on("scroll", (obj) => {
        document.documentElement.setAttribute("data-direction", obj.direction);

        if(typeof obj.currentElements['hey'] === 'object') {
            let progress = obj.currentElements['hey'].progress;
            console.log( (progress * 10).toFixed(2) );   

        }

    });












    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                   Menu scroll indecator 
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    const menuBar = select(".over > path");
    if (menuBar && !isMobile()) {
        if (currentScrollContainer.getAttribute("data-horizontal") == "true") {
            scroll.on("scroll", (obj) => {
                const hProgress = (obj.scroll.x / obj.limit.x) * 100;
                menuBar.style.strokeDashoffset = hProgress - 100;
            });
        } else {
            scroll.on("scroll", (obj) => {
                const vProgress = (obj.scroll.y / obj.limit.y) * 100;
                menuBar.style.strokeDashoffset = vProgress - 100;
            });
        }
    }



    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  Horizontal  scroll indecator 
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    const hBar = currentScrollContainer.querySelector(".h-bar");
    if (hBar && !isMobile()) {
        scroll.on("scroll", (obj) => {
            const hProgress = (obj.scroll.x / obj.limit.x) * 100;
            hBar.style.transform = "translateX(" + hProgress + "%)";
        });
    }




    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  Vertical  scroll indecator 
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    const vBar = currentScrollContainer.querySelector(".v-bar");
    if (vBar && !isMobile()) {
        scroll.on("scroll", (obj) => {
            const vProgress = (obj.scroll.y / obj.limit.y) * 100;
            vBar.style.transform = "translateY(" + vProgress + "%)";
        });
    }






    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         Update heights if page contain curtains  planes
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    if (currentScrollContainer.querySelector(".plane") && !isMobile()) {
        scroll.on("scroll", (obj) => {
            curtains.updateScrollValues(obj.scroll.x, obj.scroll.y);
        });
    }







    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 Horizontal Scroll Scale Effect 1
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    const hori1 = currentScrollContainer.querySelector(".gallery");
    if (hori1) {

        scroll.on("scroll", (obj) => {
            for (const key of Object.keys(obj.currentElements)) {
                if (obj.currentElements[key].el.classList.contains("gallery_img_container")) {
                    let progress = obj.currentElements[key].progress;
                    const scaleVal =
                        progress < 0.5
                            ? clamp(map(progress, 0, 0.5, 0.2, 1), 0.2, 1)
                            : clamp(map(progress, 0.5, 1, 1, 0.2), 0.2, 1);
                    obj.currentElements[key].el.parentNode.style.transform = `scale(${scaleVal})`;
                }
            }
        });
        
    }



    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               Horizontal Scroll Scale Effect 2
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    const hori2 = currentScrollContainer.querySelector(".scale-content");
    if (hori2) {
        scroll.on("scroll", (obj) => {
            for (const key of Object.keys(obj.currentElements)) {
                if (obj.currentElements[key].el.classList.contains("h-img")) {
                    let progress = obj.currentElements[key].progress;
                    const scaleVal = clamp(1 + progress, 1, 1.8);
                    obj.currentElements[key].el.style.transform = `scale(${scaleVal})`;
                }
            }
        });
    }


  
}



export { scroll, smooth };






























  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          (Buggy)     data-scroll Functions
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    setTimeout(() => {
        scroll.on("call", (value, way, obj) => {
            if (way === "enter") {
                switch (value) {
                    case "pageColor":
                        currentScrollContainer.style.backgroundColor = obj.id;
                        break;
                }
            }
        });
    }, 800);
   */