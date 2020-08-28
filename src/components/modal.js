import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import filmCardTpl from "../template/film-card.hbs";
import filmCardTplDel from "../template/film-cardDel.hbs";
import filmCardTplDelQ from "../template/film-cardQ.hbs";
import filmCardTplDelW from "../template/film-cardW.hbs";

import { pullData } from "./services/services";
import { write } from "./localStorage.js";
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
  openTrailerModal();
}

export function openTrailerModal() {
  const trailerBtn = document.querySelector("[data-name ='trailer']");
  trailerBtn.addEventListener("click", () => {
    const ApiKey = "7f0b5ab01080cb0bb4b9db0d9bc41efa";
    const url = `https://api.themoviedb.org/3/movie/${idForLocalStorage}/videos?api_key=${ApiKey}&language=en-US`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const id = data.results[0].key;
        const instance = basicLightbox.create(`
    <iframe width="560" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
        instance.show();
      });
  });

  // trailerBtn.addEventListener("click", () => {
  //   // linkForVideo = GetVideoTrailer(titleForLink);
  //   // const trailerId = event.srcElement.dataset.id;
  //   const URL = `https://api.themoviedb.org/3/movie/${idForLocalStorage}/videos?api_key=89b9004c084fb7d0e8ffaadd17cb8254&language=en-US`;
  //   console.log(URL);
  //   fetch(URL)
  //     .then(res => res.json())
  //     .then(data => {
  //       const videos = data.results;
  //       const video = videos[0];
  //       const videoKey = video.key;
  //               const instance = basicLightbox.create(`
  //           <iframe src="https://www.youtube.com/embed/${videoKey}" width="560" height="315" frameborder="0"></iframe>
  //       `);
  //       instance.show();
  //     })
  //     });
    }
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


mainFilmList.addEventListener("click", openModal);

export function getIDFromIMG(id) {
  return id;
}
