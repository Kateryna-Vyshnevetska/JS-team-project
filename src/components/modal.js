import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import filmCardTpl from "../template/film-card.hbs";
import { pullData } from "./services/services";
import { write } from "./localStorage.js";
const mainFilmList = document.querySelector(".list-film");

let idForLocalStorage;
let linkForVideo;
let titleForLink;

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
