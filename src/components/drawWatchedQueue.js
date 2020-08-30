import { drawHtml } from "./services/services.js";
import refs from "../options/refs.js";

import {
  createPaginator,
  checkCreatePuginator,
  checkCreatePuginatorForSearch,
} from "./paginator.js";
import Pagination from "tui-pagination";

const librWatched = document.querySelector(".libr-watched");
const librQueue = document.querySelector(".libr-queue");
const massegeWatched = document.querySelector(".is-massege-watched-hidden");
const massegeQueue = document.querySelector(".is-massege-queue-hidden");
const libraryRef = document.querySelector('[data-nav-choice="my-library"]');
const body = document.querySelector(".list-film");
const listFilmRef = document.querySelector(".js-name");
const popularTitle = document.querySelector(".popular-title");

let amountOfPages;
let lengthWatched;
let lengthQueue;
let perPage = 20;
let newArrWitnWatched = [];

const drawLibraryWatched = function () {
  let arrLibraryWatched = [];
  listFilmRef.textContent = "Your library watched";
  massegeWatched.style.display = "none";
  massegeQueue.style.display = "none";
  popularTitle.style.display = "none";

  if ((arrLibraryWatched = JSON.parse(localStorage.getItem("arrWatched")))) {
    lengthWatched = arrLibraryWatched.length;
    if (lengthWatched > 20) {
      amountOfPages = Math.ceil(arrLibraryWatched.length / 20);

      for (let i = 0; i <= amountOfPages; i++) {
        newArrWitnWatched.push(arrLibraryWatched.splice(0, perPage));
      }
      drawHtml(newArrWitnWatched[0]);
      createPaginatorForLibrary(amountOfPages);
    }
    // drawHtml(arrLibraryWatched);
  } else {
    console.log("delete");
    body.innerHTML = "";
    massegeWatched.style.display = "block";
  }
};

const drawLibraryQueue = function () {
  listFilmRef.textContent = "Your library queue";
  let arrLibraryQueue = [];
  (massegeQueue.style.display = "none"),
    (massegeWatched.style.display = "none");
  if ((arrLibraryQueue = JSON.parse(localStorage.getItem("arrQueue")))) {
    if (arrLibraryQueue.length > 20) {
      createPaginatorForLibrary(arrLibraryQueue.length);
    }
    drawHtml(arrLibraryQueue);
  } else {
    body.innerHTML = "";
    massegeQueue.style.display = "block";
  }
};

function backToTop() {
  window.scroll({
    top: 770,
    behavior: "auto",
  });
}

export const createPaginatorForLibrary = function (pageForStartPaginator) {
  const paginatorOptions = {
    totalItems: lengthWatched,
    itemsPerPage: 20,
    visiblePages: getVisiblePagesCount(),
    centerAlign: true,
    totalPage: pageForStartPaginator,
  };

  new Pagination(document.getElementById("pagination3"), paginatorOptions);
  let page = 0;
  refs.paginationRef3.addEventListener("click", (event) => {
    isEnabled(event);
  });

  function isEnabled(event) {
    const arr = Array.from(event.target.classList);
    if (!arr.includes("tui-pagination")) {
      setPaginator(event);
      backToTop();
    }
  }

  function setPaginator(event) {
    const text = event.target.textContent;
    console.log(text);
    if (text === "next") {
      page += 1;
      drawHtml(newArrWitnWatched[page]);
    } else if (text === "prev") {
      page -= 1;
      console.log(page);
      drawHtml(newArrWitnWatched[page]);
    } else if (text === "first") {
      page = 1;
    } else if (text === "last") {
      page = myNewTotalPage;
      console.log("check", page);
    } else {
      page = Number(text) - 1;
      console.log("page", page);
      drawHtml(newArrWitnWatched[page]);
    }
    // drawHtml(newArrWitnWatched[page]);
    // if (typeof myNewInput === "undefined") {
    //   showPopular(page);
    // } else if (myNewInput.length > 0) {
    //   filmsSearch(myNewInput, page);
    // } else {
    //   return;
    // }
  }

  function getVisiblePagesCount() {
    if (document.body.clientWidth <= 767) {
      return 5;
    } else {
      return 7;
    }
  }
};

librWatched.addEventListener("click", drawLibraryWatched);
librQueue.addEventListener("click", drawLibraryQueue);
libraryRef.addEventListener("click", () => {
  drawLibraryWatched();
  refs.paginationRef.classList.add("is-hidden-paginator");
});
