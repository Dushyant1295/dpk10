import "./menu.scss";
import { isMobile } from "../Helper";
import { scroll } from "../smooth-scrollbar/smoothscrollBar";




function menu1() {
    const menuWrapper = document.querySelector(".menu-wrapper");
    const closeWrapper = menuWrapper?.querySelector(".close-wrapper");
    const menuBtn = document.querySelector(".menu-btn");

    if (menuWrapper && closeWrapper && menuBtn) {
        closeWrapper.addEventListener("click", () => {
            menuWrapper.classList.remove("active");
        });

        menuBtn.addEventListener("click", () => {
            menuWrapper.classList.toggle("active");
        });
    }
}


const menuClose = () => {
    const closeBtn = document.getElementById("trigger");
    if (closeBtn) {
        closeBtn.checked = false;
    }
};


const preventReload = function (e) {
    if (e.currentTarget.href === window.location.href) {
        e.preventDefault();
        e.stopPropagation();
        menuClose();

        if (!isMobile()) {
            scroll.scrollTo(0, 0, 1000, {
                // callback: () => console.log('done!')
            });
        }
    }
};


export { menu1, menuClose, preventReload };
