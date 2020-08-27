import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import filmCardTpl from "../template/film-card.hbs";
import filmCardTplDel from "../template/film-cardDel.hbs";
import filmCardTplDelQ from "../template/film-cardQ.hbs";
import filmCardTplDelW from "../template/film-cardW.hbs";

import { pullData } from "./services/services";
import { write } from "./localStorage.js";
// import { GetVideoTrailer } from "./trailer.js";
const mainFilmList = document.querySelector(".list-film");

let idForLocalStorage;
let linkForVideo;
let titleForLink;


const modalOptions = {
  onShow: () => checkBodyScroll(),
  onClose: () => checkBodyScroll(),
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

function checkBodyScroll() {
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
  let markup;
  let arrW = JSON.parse(localStorage.getItem('arrWatched')) || [];
  let arrQ = JSON.parse(localStorage.getItem('arrQueue')) || [];
  if(arrW.includes(String(idForLocalStorage)) && arrQ.includes(String(idForLocalStorage))){
    markup = filmCardTplDel(obj);
  }else if(arrW.includes(String(idForLocalStorage)) && !arrQ.includes(String(idForLocalStorage))){
    markup = filmCardTplDelW(obj);
  }else if(!arrW.includes(String(idForLocalStorage)) && arrQ.includes(String(idForLocalStorage))){
    markup = filmCardTplDelQ(obj);
  }
  else{
    markup = filmCardTpl(obj);
  }
  const instance = basicLightbox.create(markup, modalOptions);
  instance.show();
  write(idForLocalStorage);
  titleForLink = document.querySelector('.card-title');
  openTrailerModal();
}

export function openTrailerModal() {
  const trailerBtn = document.querySelector("[data-name ='trailer']");

  trailerBtn.addEventListener("click", () => {
    linkForVideo = GetVideoTrailer(titleForLink);
    const instance = basicLightbox.create(`
      <video controls>
          <source src="${linkForVideo}">
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

//   ТО ЧТО БЫЛО ПЕРЕД ТРЕЙЛЕРОМ
//   const instance = basicLightbox.create(markup);
//   instance.show();
//   // loadTrailer();
//   write(idForLocalStorage);

}

mainFilmList.addEventListener("click", openModal);

export function getIDFromIMG(id) {
  return id;
}
