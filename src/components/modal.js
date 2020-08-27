import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import filmCardTpl from "../template/film-card.hbs";
import { pullData } from "./services/services";
import { write } from "./localStorage.js";
import { loadTrailer } from "./trailer.js";
const mainFilmList = document.querySelector(".list-film");

let idForLocalStorage;

export function openModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  } else {
    idForLocalStorage = event.target.dataset.id;
    let id = event.target.dataset.id;
    getCurrentObj(id);
    // document.body.classList.add('modal-open')
  }
}

function getCurrentObj(id) {
  const getInfo = pullData();
  let currentObj;
  getInfo.forEach((elem) => {
    if (elem.id === Number(id)) {
      currentObj = elem;
    }
  });
  drawModal(currentObj);
}

function drawModal(obj) {
  let markup = filmCardTpl(obj);
  const instance = basicLightbox.create(markup);
  instance.show();
  // loadTrailer();
  write(idForLocalStorage);
}

mainFilmList.addEventListener("click", openModal);

export function getIDFromIMG(id) {
  return id;
}
