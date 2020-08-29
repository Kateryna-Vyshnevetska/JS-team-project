import Pagination from "tui-pagination";
import "../../src/tui-pagination.css";
import {
    filmsSearch,
    showPopular,
    myNewTotalPage,
    myNewInput,
    myNewTotalAmountOfFilms,
} from "./services/services.js";
import refs from "../options/refs.js";
export const createPaginator = function(pageForStartPaginator) {
    const paginatorOptions = {
        totalItems: myNewTotalAmountOfFilms,
        itemsPerPage: 20,
        visiblePages: getVisiblePagesCount(),
        centerAlign: true,
        totalPage: pageForStartPaginator,
    };
    new Pagination(document.getElementById("pagination2"), paginatorOptions);
    let page = 1;
    refs.paginationRef.addEventListener("click", (event) => {
        isEnabled(event);
    });

    function isEnabled(event) {
        const arr = Array.from(event.target.classList);
        if (!arr.includes("tui-pagination")) {
            setPaginator(event);
            // backToTop();
        }
    }

    function setPaginator(event) {
        page = 1;
        const text = event.target.textContent;
        if (text === "next") {
            page++;
        } else if (text === "prev") {
            page--;
        } else if (text === "first") {
            page = 1;
        } else if (text === "last") {
            page = myNewTotalPage;
            console.log("check", page);
        } else {
            page = text;
        }
        filmsSearch(myNewInput, page);
        console.log('page', page);
        console.log('create paginator в конце создания пагинатора ', myNewInput);
    }

    function getVisiblePagesCount() {
        if (document.body.clientWidth <= 767) {
            return 5;
        } else {
            return 7;
        }
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 5);
    }
}

function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;
    if (scrolled > coords) {
        goTopBtn.classList.add("back_to_top-show");
    }
    if (scrolled < coords) {
        goTopBtn.classList.remove("back_to_top-show");
    }
}
let goTopBtn = document.querySelector(".back_to_top");
window.addEventListener("scroll", trackScroll);
goTopBtn.addEventListener("click", backToTop);