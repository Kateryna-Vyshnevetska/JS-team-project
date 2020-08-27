import refs from "../options/refs.js";
import debounce from "lodash.debounce";
import { filmsSearch } from "./services/services.js";
import { res } from "./services/services.js";
import { getPopular } from "./services/services.js";

const checkInput = function (e) {
  e.preventDefault();

  let reg = /[^\d\sA-Z]/gi;
  let inputValue = e.target.value.match(reg);

  if (!inputValue) {
    filmsSearch(e.target.value);
    setTimeout(() => {
      refs.searchInfo.classList.remove("unSuccessful");
      refs.searchInfo.classList.add("successful");
      refs.searchInfo.textContent = `По вашему запросу найдено ${res} фильм(ов/а)`;
      if (res === 0) {
        refs.searchInfo.classList.remove("successful");
        refs.searchInfo.classList.add("unSuccessful");
        refs.searchInfo.style.textAlign = "left";
        refs.paginationRef.classList.add("is-not-visible");
      } else if (e.target.value === "") {
        getPopular();
        refs.searchInfo.textContent = "";
      }
    }, 500);
  } else {
    refs.searchInfo.classList.remove("successful");
    refs.searchInfo.classList.add("unSuccessful");
    refs.searchInfo.textContent = `Search result not successful. Enter the correct movie name and try again`;
    refs.paginationRef.classList.add("is-not-visible");
    refs.searchInfo.style.textAlign = "center";
  }
};

refs.inputSearchRef.addEventListener("change", debounce(checkInput, 1000));
