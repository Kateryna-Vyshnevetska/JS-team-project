import { drawHtml } from "./services/services.js";
console.log('work');
const librWatched = document.querySelector(".libr-watched");
const librQueue = document.querySelector(".libr-queue");
const massegeWatched = document.querySelector('.is-massege-watched-hidden');
const massegeQueue = document.querySelector('.is-massege-queue-hidden');

const drawLibraryWatched = function () {
    let arrLibraryWatched;
    if (arrLibraryWatched = JSON.parse(localStorage.getItem("arrWatched"))) {
        drawHtml(arrLibraryWatched);
    } else if (arrLibraryWatched = []) {
        drawHtml(massegeWatched.style.display = "block", massegeQueue.style.display = "none")
    }
};

const drawLibraryQueue = function () {
    let arrLibraryQueue;
    if (arrLibraryQueue = JSON.parse(localStorage.getItem("arrQueue"))) {
        drawHtml(arrLibraryQueue);
    } else if (arrLibraryQueue = []) { 
        drawHtml(massegeQueue.style.display = "block", massegeWatched.style.display = "none")
    }
};

librWatched.addEventListener("click", drawLibraryWatched);
librQueue.addEventListener('click', drawLibraryQueue);


