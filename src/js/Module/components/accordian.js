import "./accordian.scss";
import gsap from "gsap";



function accordionInit(accordion) {
    const titles = accordion.querySelectorAll(".accordian-title");

    titles.forEach(function (list) {
        list.addEventListener("click", function () {
            const parentLi = list.parentNode;

            parentLi.classList.contains("selected")
                ? closeList(parentLi)
                : openList(parentLi);

            // closeAllList();

            setTimeout(() => {
                const ev = document.createEvent("HTMLEvents");
                ev.initEvent("resize", true, false);
                window.dispatchEvent(ev);
            }, 600);
        });
    });

    function openList(list) {
        const content = list.querySelector(".accordion_item");

        gsap.set(content, { height: "auto" });
        gsap.from(content, { height: 0, ease: "expo.out" });
        list.classList.add("active", "selected");

        setTimeout(function () {
            list.classList.remove("active");
        }, 200);
    }

    function closeList(list) {
        const content = list.querySelector(".accordion_item");
        gsap.to(content, { height: 0, ease: "expo.out" });
        list.classList.remove("selected");
    }
}



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 Barba Views
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function accordianView() {
    const accordions = document.querySelectorAll(".accordion");
    if (accordions.length > 0) {
        accordions.forEach(accordion => {
            accordionInit(accordion);
        });
    }
}

export { accordianView };












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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
