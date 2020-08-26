import { API_KEY } from "../../options/apikey.js";
import refs from "../../options/refs.js";
import mainTemplate from "../../template/mainTemplate.hbs";

// keyword и page пока заглушка, будет брать из инпута
const page = 1;
const keyWord = "dog";

let dataForModal;
export const filmsSearch = function () {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyWord}&page=${page}&include_adult=false`
  )
    .then((list) => list.json())
    .then((list) => {
      getFilmsByWord(list);
    })
    .catch((error) => {
      console.log(error);
    });
};

const drawHtml = (data) => {
  dataForModal = [ ...data];
  const markup = mainTemplate(data);
  refs.listFilms.innerHTML = markup;

};

export const pullData = () => {
  return dataForModal;
};



export const getDetails = function (id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then((list) => list.json())
    .catch((error) => {
      console.log(error);
    });
};

// при вызове популярных так же срабатывают и другие функции как при обычном поиске
export const getPopular = function () {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
  )
    .then((list) => list.json())
    .then((list) => {
      getFilmsByWord(list);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getGenres = function () {
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    .then((list) => list.json())
    .then((list) => {
      console.log(list);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getFilmsByWord = function (list) {
  console.log(list);
  const results = list.results;
  dateSlice(results);
  drawHtml(results);
  // pullData(results)
};

const dateSlice = function (results) {
  results.map((el) => {
    el.release_date = el.release_date.slice(0, 4);
  });
};

// getDetails(2734)
getPopular();
getGenres();
// filmsSearch()
