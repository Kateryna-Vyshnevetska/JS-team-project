import { getIDFromIMG } from "./modal.js";

let idMovie;

//------new-way
const saveMovie = (value, id) => {
    let arr = JSON.parse(localStorage.getItem(value)) || [];
    arr.push(id);
    localStorage.setItem(value, JSON.stringify(arr));
    // if (arr.includes(id)) {
    // }
};

//-------queue-functions
const saveMovieQueue = (value, id) => {
  let arr = JSON.parse(localStorage.getItem(value)) || [];
  arr.unshift(id);
    localStorage.setItem(value, JSON.stringify(arr));
    console.log();
  // if (arr.includes(id)) {
  // }
};


const checkDelete = function (value, id) {
  let arr = JSON.parse(localStorage.getItem(value)) || [];
  const findIndex = arr.indexOf(id);
  arr.splice(findIndex, 1);
  localStorage.setItem(value, JSON.stringify(arr));
};

// =============================================

export function write(some) {
  idMovie = some;
  const allBtn = document.querySelector(".card-button__wrapper");
  allBtn.addEventListener("click", checkClickBtn);
}

const checkClickBtn = (ev) => {
    console.log(ev.target);
    const btnWatched = document.querySelector(".card-button__watched");
    const btnDelWatched = document.querySelector(".card-button__del-watched");
    const btnQueue = document.querySelector(".card-button__queue");
    const btnDelQueue = document.querySelector(".card-button__del-queue");

    if (btnWatched) {
         saveMovie("arrWatched", idMovie);
    } else if (btnDelWatched) {
        checkDelete("arrWatched", idMovie);
    } else if (btnQueue) {
        saveMovieQueue("arrQueue", idMovie);
    } else if (btnDelQueue) {
        checkDelete("arrQueue", idMovie);
    }
};

