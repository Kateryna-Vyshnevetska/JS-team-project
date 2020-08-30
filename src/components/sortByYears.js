import refs from "../options/refs.js";
import years from "../template/years.hbs";
import { drawHtml } from "./services/services.js";

// let arr = JSON.parse(localStorage.getItem("searchFilms"));
let arr;
export function sortByYear() {
  arr = JSON.parse(localStorage.getItem("searchFilms"));
  let arrYears = arr.results.map((el) =>
    el.release_date.slice(0, el.release_date.length - 6)
  );
  console.log(arrYears);
  let filteredArrYears = arrYears.filter((el) => el !== "");
  let sortedfilteredArrYears = filteredArrYears.sort((a, b) => b - a);
  let arrayRemoveDublicate = new Set(sortedfilteredArrYears);
  let arrayPerfect = [...arrayRemoveDublicate];
  console.log(arrayPerfect);

  if (filteredArrYears) {
    refs.yearsRef.classList.remove("is-not-visible");

    refs.yearsRef.innerHTML = `<option value="" selected>Select year</option>${years(
      arrayPerfect
    )}`;
  } else return;
}

function getYear(event) {
  const res = arr.results.filter((el) => {
    return (
      el.release_date.slice(0, el.release_date.length - 6) ===
      event.target.value
    );
  });
  console.log(res);
  drawHtml(res);
}

refs.yearsRef.addEventListener("change", getYear);
