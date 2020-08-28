import { drawHtml } from "./services/services.js";

const librWatched = document.querySelector(".libr-watched");
const librQueue = document.querySelector(".libr-queue");

const drawLibraryWatched = function () {
    let arrLibraryWatched = JSON.parse(localStorage.getItem("arrWatched")) || [];
    drawHtml(arrLibraryWatched);
};

const drawLibraryQueue = function () {
    let arrLibraryQueue = JSON.parse(localStorage.getItem("arrQueue")) || [];
    drawHtml(arrLibraryQueue);
};

librWatched.addEventListener("click", drawLibraryWatched);
librQueue.addEventListener('click', drawLibraryQueue);