import { API_KEY } from "../../options/apikey.js";
import { data } from "autoprefixer";
import refs from "../../options/refs.js";
import mainTemplate from "../../template/mainTemplate.hbs";

// For Kate`s modal
let dataForModal;

// keyword и page пока заглушка, будет брать из инпута
const page = 1;
export let res;
// const keyWord = 'dog';

export const filmsSearch = function (keyWord) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyWord}&page=${page}&include_adult=false`
  )
    .then((list) => list.json())
    .then((list) => {
      res = list.total_results;
      getFilmsByWord(list);
    })
    .catch((error) => {
      console.log(error);
    });
};

const drawHtml = (data) => {
  dataForModal = [...data];
  const markup = mainTemplate(data);
  refs.listFilms.innerHTML = markup;
};

// For Kate`s modal
export const pullData = () => {
  return dataForModal;
};

// Предыдущая функция Тофика
// export const filmsSearch = function(page) {
//     fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyWord}&page=${page}&include_adult=false`)
//         .then((list) => list.json())
//         .then((list) => {
//             getFilmsByWord(list)
//         }).catch(error => {
//             console.log(error);
//         })
// }

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

const getGenres = function (results) {
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    .then((list) => list.json())
    .then((list) => {
      changeGenres(list, results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getFilmsByWord = function (list) {
  const results = list.results;
  getGenres(results);
  dateSlice(results);
  drawHtml(results);
};

const changeGenres = function (list, results) {
  const genrList = list.genres;
  const generID = genrList.map((el) => el.id);
  const generName = genrList.map((el) => el.name);
  const resultsGenerIds = results.map((el) => el.genre_ids);

  // console.log(resultsGenerIds);
  // console.log(generID);
  // console.log(generName);
  // console.log(results);
};

const dateSlice = function (results) {
  results.map((el) => {
    el.release_date = el.release_date.slice(0, 4);
  });
};

// getDetails(2734)
getPopular();

// filmsSearch()
