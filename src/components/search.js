import { API_KEY } from "../options/apikey.js";
import refs from "../options/refs.js";

const checkInput = (e) => {
  e.preventDefault();

  let reg = /[\wа-яё]+/gi;
  let inputValue = e.target.value.match(reg);

  if (inputValue) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${inputValue}`
    )
      .then((response) => response.json())
      .then(
        (data) =>
          (refs.searchInfo.innerHTML = `По вашему запросу найдено ${data.results.length} фильмов`)
      );
  } else
    refs.searchInfo.innerHTML = `Результат поиска не удался. Введите правильное название фильма и попробуйте еще раз`;
};

refs.search.addEventListener("change", checkInput);
