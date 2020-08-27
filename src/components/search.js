import refs from "../options/refs.js";
import debounce from "lodash.debounce";
import { filmsSearch } from "./services/services.js";
import { getPopular } from "./services/services.js";
import { totalResults } from "./services/services.js";

const checkInput = function (e) {
  e.preventDefault();

  let reg = /[^\d\sA-Z]/gi;
  let inputValue = e.target.value.match(reg);

  if (!inputValue) {
    filmsSearch(e.target.value);
    // const d = filmsSearch(e.target.value).then((f) => {
    //   return getGenres().then((g) =>
    //     f.map((el) => ({
    //       ...el,
    //       genre_ids: el.genre_ids.flatMap((num) =>
    //         g.filter((el) => el.id === num)
    //       ),
    //     }))
    //   );
    // });
    // d.then(drawHtml);
    setTimeout(() => {
      refs.searchInfo.classList.remove("unSuccessful");
      refs.searchInfo.classList.add("successful");
      refs.searchInfo.textContent = `По вашему запросу найдено ${totalResults} фильм(ов/а)`;
      if (totalResults === 0) {
        refs.searchInfo.classList.remove("successful");
        refs.searchInfo.classList.add("unSuccessful");
        refs.searchInfo.style.textAlign = "left";
        refs.paginationRef.classList.add("is-not-visible");
      } else if (e.target.value === "") {
        getPopular();
        refs.searchInfo.textContent = "";
      }
    }, 800);
  } else {
    refs.searchInfo.classList.remove("successful");
    refs.searchInfo.classList.add("unSuccessful");
    refs.searchInfo.textContent = `Search result not successful. Enter the correct movie name and try again`;
    refs.paginationRef.classList.add("is-not-visible");
    refs.searchInfo.style.textAlign = "center";
  }
};

refs.inputSearchRef.addEventListener("change", debounce(checkInput, 1000));
