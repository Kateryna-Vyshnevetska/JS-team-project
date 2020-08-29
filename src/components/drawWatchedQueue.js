import { drawHtml } from "./services/services.js";
// console.log("work");
const librWatched = document.querySelector(".libr-watched");
const librQueue = document.querySelector(".libr-queue");
const massegeWatched = document.querySelector('.is-massege-watched-hidden');
const massegeQueue = document.querySelector('.is-massege-queue-hidden');
const body = document.querySelector('.list-film');


const drawLibraryWatched = function () {
// <<<<<<< search8
//   let arrLibraryWatched = JSON.parse(localStorage.getItem("arrWatched")) || [];
//   console.log(arrLibraryWatched);
//   drawHtml(arrLibraryWatched);
// };

// const drawLibraryQueue = function () {
//   let arrLibraryQueue = JSON.parse(localStorage.getItem("arrQueue")) || [];
//   drawHtml(arrLibraryQueue);
// };

// librWatched.addEventListener("click", drawLibraryWatched);
// librQueue.addEventListener("click", drawLibraryQueue);
// =======
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

