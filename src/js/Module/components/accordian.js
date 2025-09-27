import "./accordian.scss";
import gsap from "gsap";




function openList(list) {
    const content = list.querySelector(".accordion-content");
    gsap.set(content, { height: "auto" });
    gsap.from(content, { height: 0, ease: "expo.out" });
    list.classList.add("selected");
}

function closeList(list) {
    const content = list.querySelector(".accordion-content");
    gsap.to(content, { height: 0, ease: "expo.out" });
    list.classList.remove("selected");
}

function accordionInit(accordion) {
    const titles = accordion.querySelectorAll(".accordian-title");
    
    titles.forEach(function (list) {
        list.addEventListener("click", function () {
            const parentLi = list.parentNode;
            parentLi.classList.contains("selected")
                ? closeList(parentLi)
                : openList(parentLi);
            // closeAllList();
        });
    });  
}



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 Barba Views
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function accordian() {
    const acc = document.querySelector(".accordion");
    if (acc) accordionInit(acc);
};

export { accordian };












/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Misc:- if we want to close all other besides 1 active

const lists = accordion.querySelectorAll("li");
function closeAllList() {
  lists.forEach(function (list) {
    if (!list.classList.contains("active")) {
      closeList(list);
    }
  });
}


// no need for now in case need then check

        setTimeout(() => {
                const ev = document.createEvent("HTMLEvents");
                ev.initEvent("resize", true, false);
                window.dispatchEvent(ev);
            }, 600);

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
