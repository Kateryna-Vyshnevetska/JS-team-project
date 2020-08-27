import refs from "../options/refs.js";
import { drawHtml } from "./services/services.js";

function sortByPopularity() {
  refs.sortBtn.classList.toggle("is-active");

  if (refs.sortBtn.classList.contains("is-active")) {
    let films = JSON.parse(localStorage.getItem("searchFilms"));
    let sortedFilms = films.results.sort((a, b) => b.popularity - a.popularity);
    drawHtml([...sortedFilms]);
  } else if (!refs.sortBtn.classList.contains("is-active")) {
    let films = JSON.parse(localStorage.getItem("searchFilms"));
    drawHtml([...films.results]);
  }
}

refs.sortBtn.addEventListener("click", sortByPopularity);
