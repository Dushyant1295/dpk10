import "./menu.scss";
 
// import { scrollTop } from "../smooth-scrollbar/smoothscrollBar";

function menu() {
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

 
function checkCurrentPage() {
    const currentURL = document.location.href;
    const links = document.querySelectorAll("header a");
    const dropdown = document.querySelectorAll(".hasDropdown");


    links.forEach(link => {
        const isLinkActive = link.href === currentURL;
        link.classList.toggle("active", isLinkActive);
        if (isLinkActive) {
            link.addEventListener("click", e => {
                e.preventDefault();
                // scrollTop();
            });
        }
    });

    dropdown.forEach(element => {
        const el = element.querySelector(".dropdown-menu");
        const subel = el.querySelector("a.active");

        element.classList.toggle("active", subel !== null);

        element.addEventListener("click", () => {
            setTimeout(() => el.classList.add("disappear"), 400);
            setTimeout(() => el.classList.remove("disappear"), 900);
        });
    });
}


function menuAccordian() {
    const subArrow = document.querySelectorAll(".h-sub-menu .dropdown-arrow");
    subArrow.forEach((sarrow) => {
        sarrow.addEventListener("click", function () {
            sarrow.parentNode.classList.toggle("active");
        });
    });
}




export { menu, menuClose, checkCurrentPage, menuAccordian };
