import "./site-search.scss";

function siteSearch() {
    const closeBtn = document.querySelector(".search-form-wrap .close-btn");
    const searchBtn = document.querySelector(".site-search");
    const searchFormWrap = document.querySelector(".search-form-wrap");

    searchBtn &&
        searchBtn.addEventListener("click", function () {
            searchFormWrap.classList.add("active");
        });

    closeBtn &&
        closeBtn.addEventListener("click", function () {
            searchFormWrap.classList.remove("active");
        });
}


export { siteSearch }