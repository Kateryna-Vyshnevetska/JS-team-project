import { drawHtml } from "./services/services.js";
import refs from "../options/refs.js";
import {
  createPaginator,
  checkCreatePuginator,
  checkCreatePuginatorForSearch,
} from "./paginator.js";


const librWatched = document.querySelector(".libr-watched");
const librQueue = document.querySelector(".libr-queue");
const massegeWatched = document.querySelector('.is-massege-watched-hidden');
const massegeQueue = document.querySelector('.is-massege-queue-hidden');
const libraryRef = document.querySelector('[data-nav-choice="my-library"]');
const body = document.querySelector('.list-film');
const listFilmRef = document.querySelector(".js-name");

const drawLibraryWatched = function () {
    let arrLibraryWatched = [];
    massegeWatched.style.display = "none", massegeQueue.style.display = "none"
    if (arrLibraryWatched = JSON.parse(localStorage.getItem("arrWatched"))) {
        drawHtml(arrLibraryWatched);
    } else {
        body.innerHTML = '';
        massegeWatched.style.display = "block";
    }
};

const drawLibraryQueue = function () {
    let arrLibraryQueue = [];
    massegeQueue.style.display = "none", massegeWatched.style.display = "none";
    if (arrLibraryQueue = JSON.parse(localStorage.getItem("arrQueue"))){
        drawHtml(arrLibraryQueue);
    } else{ 
        body.innerHTML = '';
        massegeQueue.style.display = "block";
    }
};

librWatched.addEventListener("click", drawLibraryWatched);
librQueue.addEventListener('click', drawLibraryQueue);
// librQueue.addEventListener("click", () => {
//     refs.paginationRef.classList.add("is-hidden-paginator");
//     drawLibraryQueue()
// } );
// libraryRef.addEventListener("click", () => {
//   refs.paginationRef.classList.add("is-hidden-paginator");
//   drawLibraryWatched();
// });

// if (arrLibraryWatched.length > 20) {
//     refs.paginationRef.classList.remove("is-hidden-paginator");
      
//     createPaginator(arrLibraryWatched.length);
//     drawHtml(arrLibraryWatched)
//   }