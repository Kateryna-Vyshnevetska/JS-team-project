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
  // if (arr.includes(id)) {
  // }
};


const checkDelete = function (value, id) {
  let arr = JSON.parse(localStorage.getItem(value)) || [];

  arr.forEach(el => {
    if (JSON.stringify(el) === JSON.stringify(id)) {
      const findIndex = arr.indexOf(el);
      arr.splice(findIndex, 1);
      localStorage.setItem(value, JSON.stringify(arr));
    } else {
      return;
    }
  })
};

// =============================================

export function write(some) {
  idMovie = some;
  const allBtn = document.querySelector(".card-button__wrapper");
  allBtn.addEventListener("click", checkClickBtn);
}

const checkClickBtn = (ev) => {
  // console.log(ev.target);
  const btnWatched = document.querySelector(".card-button__watched");
  const btnDelWatched = document.querySelector(".card-button__del-watched");
  const btnQueue = document.querySelector(".card-button__queue");
  const btnDelQueue = document.querySelector(".card-button__del-queue");

  if (ev.target === btnWatched && btnWatched.textContent === "add to watched") {
    saveMovie("arrWatched", idMovie);
    btnWatched.textContent = "delete from watched";
    console.log(btnWatched.textContent);
  } else if(ev.target === btnWatched && btnWatched.textContent === "delete from watched"){
    checkDelete("arrWatched", idMovie);
    btnWatched.textContent = "add to watched";
  }else if (
    ev.target === btnDelWatched &&
    btnDelWatched.textContent === "delete from watched"
  ) {
    checkDelete("arrWatched", idMovie);
    btnDelWatched.textContent = "add to watched";
  } else if (
    ev.target === btnDelWatched &&
    btnDelWatched.textContent === "add to watched"
  ) {
    saveMovie("arrWatched", idMovie);
    btnWatched.textContent = "delete from watched";
  }else if (ev.target === btnQueue && btnQueue.textContent === "add to queue") {
    saveMovieQueue("arrQueue", idMovie)
    btnQueue.textContent = "delete from queue";
  } else if(ev.target === btnQueue && btnQueue.textContent === "delete from queue"){
    checkDelete("arrQueue", idMovie)
    btnQueue.textContent = "add to queue";
  }else if (ev.target === btnDelQueue && btnDelQueue.textContent === "delete from queue") {
    checkDelete("arrQueue", idMovie)
    btnDelQueue.textContent = "add to queue";
  }else if (ev.target === btnDelQueue && btnDelQueue.textContent === "add to queue") {
    saveMovieQueue("arrQueue", idMovie)
    btnDelQueue.textContent = "delete from queue";
  }
}
// localStorage.clear()