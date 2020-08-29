import { drawHtml } from "./services/services.js";
import refs from "../options/refs.js";
import {
  createPaginator,
  checkCreatePuginator,
  checkCreatePuginatorForSearch,
} from "./paginator.js";


const librWatched = document.querySelector(".libr-watched");
const librQueue = document.querySelector(".libr-queue");
const libraryRef = document.querySelector('[data-nav-choice="my-library"]');
const listFilmRef = document.querySelector(".js-name");


const drawLibraryWatched = function () {
  let arrLibraryWatched = JSON.parse(localStorage.getItem("arrWatched")) || [];
  listFilmRef.innerHTML = '<p class="carousel-title">My Library Content</p>';

 
  if (arrLibraryWatched.length > 20) {
    refs.paginationRef.classList.remove("is-hidden-paginator");
      
    createPaginator(arrLibraryWatched.length);
    drawHtml(arrLibraryWatched)
  }
  drawHtml(arrLibraryWatched);
};

const drawLibraryQueue = function () {
  let arrLibraryQueue = JSON.parse(localStorage.getItem("arrQueue")) || [];

  listFilmRef.innerHTML = '<p class="carousel-title">My Queue Content</p>';

  drawHtml(arrLibraryQueue);
};

librWatched.addEventListener("click", drawLibraryWatched);
librQueue.addEventListener("click", () => {
    refs.paginationRef.classList.add("is-hidden-paginator");
    drawLibraryQueue()
} );
libraryRef.addEventListener("click", () => {
  refs.paginationRef.classList.add("is-hidden-paginator");
  drawLibraryWatched();
});
