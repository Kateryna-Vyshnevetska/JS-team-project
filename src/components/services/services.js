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

// export const filmsSearch = function (keyWord) {
//   fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyWord}&page=${page}&include_adult=false`
//   )
//     .then((list) => list.json())
//     .then((list) => {
//       res = list.total_results;
//       getFilmsByWord(list);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const drawHtml = (data) => {
    dataForModal = [...data];
    const markup = mainTemplate(data);
    refs.listFilms.innerHTML = markup;
};


export const filmsSearch = function(keyWord) {
    return fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=027ca1d5e779abba9fcdc8b6b57f2385&query=${keyWord}&page=${page}&include_adult=false`
        )
        .then((list) => list.json())
        .then((list) => {
            res = list.total_results;
            getFilmsByWord(list);
            return list.results;
        })
        .catch((error) => {
            console.log(error);
        });
};


// For Kate`s modal
export const pullData = () => {
    return dataForModal;
};

export const getDetails = function(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        .then((list) => list.json())
        .catch((error) => {
            console.log(error);
        });
};

// при вызове популярных так же срабатывают и другие функции как при обычном поиске
export const getPopular = function() {
    return fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
        )
        .then((list) => list.json())
        .then((list) => {
            getFilmsByWord(list);
            return list.results;

        })
        .catch((error) => {
            console.log(error);
        });
};

export const getGenres = function() {
    return fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=027ca1d5e779abba9fcdc8b6b57f2385`
        )
        .then((list) => list.json())
        .then((list) => {
            return list.genres;
        })
        .catch((error) => {
            console.log(error);
        });
};

const d = getPopular().then((f) => {
    return getGenres().then((g) =>
        f.map((el) => ({
            ...el,
            genre_ids: el.genre_ids.flatMap((num) => g.filter((el) => el.id === num)),
        }))
    );
});
d.then(drawHtml);

const getFilmsByWord = function(list, keyword) {
    let results = list.results;
    dateSlice(results);
    // drawHtml(results);

}

const dateSlice = function(results) {
    results.map((el) => {
        el.release_date = el.release_date.slice(0, 4);
    });
};

getPopular()