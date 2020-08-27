import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import filmCardTpl from "../template/film-card.hbs";
import { pullData } from "./services/services";
import { write } from "./localStorage.js";
const mainFilmList = document.querySelector(".list-film");

let idForLocalStorage;

const modalOptions = {
  onShow: () => checkScroll(),
  onClose: () => checkScroll(),
};

export function openModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  } else {
    idForLocalStorage = event.target.dataset.id;
    let id = event.target.dataset.id;
    getCurrentObj(id);
  }
}

function checkScroll() {
  document.body.classList.toggle("modal-open");
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
  const instance = basicLightbox.create(markup, modalOptions);
  instance.show();
  write(idForLocalStorage);
  openTrailerModal();
}

export function openTrailerModal() {
  const trailerBtn = document.querySelector("[data-name ='trailer']");
  trailerBtn.addEventListener("click", () => {
    const instance = basicLightbox.create(`
      <video controls>
          <source src="https://basiclightbox.electerious.com/assets/videos/video.mp4">
      </video>
  `);

    instance.show();
  });

  // чиста функція без слухачів=====================
  //   const instance = basicLightbox.create(`
  //   <video controls>
  //       <source src="https://basiclightbox.electerious.com/assets/videos/video.mp4">
  //   </video>
  // `);

  //   instance.show();
}

mainFilmList.addEventListener("click", openModal);

export function getIDFromIMG(id) {
  return id;
}
