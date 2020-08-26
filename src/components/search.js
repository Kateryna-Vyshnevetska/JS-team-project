import refs from "../options/refs.js";
import debounce from "lodash.debounce";
import { filmsSearch } from "./services/services.js";
import { res } from "./services/services.js";
// console.log("filmsSearch", filmsSearch);

const checkInput = function (e) {
  e.preventDefault();

  let reg = /\w+/gi;
  let inputValue = e.target.value.match(reg);
  if (inputValue) {
    filmsSearch(inputValue);
    setTimeout(() => {
      refs.searchInfo.classList.remove("unSuccessful");
      refs.searchInfo.classList.add("successful");
      refs.searchInfo.textContent = `По вашему запросу найдено ${res} фильм(ов/а)`;
    }, 500);
  } else {
    refs.searchInfo.classList.remove("successful");
    refs.searchInfo.classList.add("unSuccessful");
    refs.searchInfo.textContent = `Search result not successful. Enter the correct movie name and try again`;
  }
};

refs.inputSearchRef.addEventListener("change", debounce(checkInput, 1000));
