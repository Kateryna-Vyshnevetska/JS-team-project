import refs from "../options/refs.js";
import debounce from "lodash.debounce";
import { filmsSearch } from "./services/services.js";
import { getPopular } from "./services/services.js";
import { totalResults } from "./services/services.js";
import { getGenres } from "./services/services.js";
import { sortByPopularity } from "./sortByPopularity.js";
import { sortByYear } from "./sortByYears.js";
import { drawHtml, myNewTotalPage, } from "./services/services.js";
import { createPaginator } from "./paginator.js";

export const checkInput = function(e) {
  e.preventDefault();
  let reg = /[^\d\sA-Z]/gi;
  let inputValue = e.target.value.match(reg);

  const d = filmsSearch(e.target.value).then((f) => {
    return getGenres().then((g) =>
      f
        .map((el) => ({
          ...el,
          genre_ids: el.genre_ids.flatMap((num) =>
            g.filter((el) => el.id === num)
          ),
        }))
        .sort((a, b) => b.vote_average - a.vote_average)
    );
  });
  d.then(drawHtml);

  if (!inputValue) {
    setTimeout(() => {
      refs.notFoundContainer.classList.add("is-not-visible");
      refs.searchInfo.classList.remove("unSuccessful");
      refs.searchInfo.classList.add("successful");
      refs.searchInfo.style.textAlign = "left";
      refs.searchInfo.textContent = `Found ${totalResults} movie(s) by your request`;
      sortByYear();
      sortByPopularity();
      createPaginator(myNewTotalPage);
      console.log('sds', myNewTotalPage);

      if (totalResults === 0) {
        refs.notFoundContainer.classList.remove("is-not-visible");
        showPopular(page)
        console.log('первое то что нам надо ');
        refs.searchInfo.classList.remove("successful");
        refs.searchInfo.classList.add("unSuccessful");
        refs.searchInfo.textContent = `Found ${totalResults} movie(s) by your request`;
        refs.paginationRef.classList.add("is-not-visible");
      } else if (e.target.value === "") {
        console.log('второе то что нам надо ');
        showPopular(page)
        
        refs.searchInfo.textContent = "";
        refs.notFoundContainer.classList.add("is-not-visible");
      }
    }, 800);
  } else {
    refs.searchInfo.classList.remove("successful");
    refs.searchInfo.classList.add("unSuccessful");
    refs.searchInfo.textContent = `Search result not successful. Enter the correct movie name and try again`;
    refs.paginationRef.classList.add("is-not-visible");
    refs.searchInfo.style.textAlign = "center";
    refs.notFoundContainer.classList.add("is-not-visible");
    
  }
};

refs.inputSearchRef.addEventListener("change", debounce(checkInput, 1000));
