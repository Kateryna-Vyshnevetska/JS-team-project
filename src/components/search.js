import refs from "../options/refs.js";
import debounce from "lodash.debounce";
import { filmsSearch } from "./services/services.js";
import { getGenres } from "./services/services.js";
import { drawHtml } from "./services/services.js";

import { res } from "./services/services.js";
// console.log("filmsSearch", filmsSearch);

const checkInput = function(e) {
    e.preventDefault();

    let reg = /\w+/gi;
    let inputValue = e.target.value.match(reg);
    if (inputValue) {

        // Добавил Тофик для работы отрисовки при поиске
        filmsSearch(inputValue);
        const d = filmsSearch(inputValue).then((f) => {
            return getGenres().then((g) =>
                f.map((el) => ({
                    ...el,
                    genre_ids: el.genre_ids.flatMap((num) => g.filter((el) => el.id === num)),
                }))
            );
        });
        d.then(drawHtml);

        setTimeout(() => {
            refs.searchInfo.classList.remove("unSuccessful");
            refs.searchInfo.classList.add("successful");
            refs.searchInfo.textContent = `По вашему запросу найдено ${res} фильм(ов/а)`;
            if (res === 0) {
                refs.paginationRef.classList.add("is-not-visible");
            }
        }, 500);
    } else {
        refs.searchInfo.classList.remove("successful");
        refs.searchInfo.classList.add("unSuccessful");
        refs.searchInfo.textContent = `Search result not successful. Enter the correct movie name and try again`;
        refs.paginationRef.classList.add("is-not-visible");
    }
};

refs.inputSearchRef.addEventListener("change", debounce(checkInput, 1000));