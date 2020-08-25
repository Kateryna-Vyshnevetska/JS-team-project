import { API_KEY } from '../../options/apikey.js';
import { data } from 'autoprefixer';
import refs from "../../options/refs.js";
import mainTemplate from '../../template/mainTemplate.hbs'

// keyword и page пока заглушка, будет брать из инпута
const page = 1;

const keyWord = 'cat';
const imgArr = [];

const dataForTemplate = {
    items: [],
}

export const filmsSearch = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyWord}&page=${page}&include_adult=false`)
    .then((list) => list.json())
    .then((list) => getFilmsByWord(list.results));

const getFilmsByWord = function(list) {
    // console.log(list) массив элементов по ключевому слову
    const imgCode = list.map(el => el.poster_path);

    imgCode.forEach(el => {
        findImg(el)
    });
    drawHtml(dataForTemplate)
}

const drawHtml = (data) => {
    const markup =  mainTemplate(data);
    refs.listFilms.innerHTML = markup;
}

// массив ссылок на картинку
const addImgInArr = function(imgUrl) {
    dataForTemplate.items.forEach(el => {
        el.url = imgUrl;
    })
    
    // console.log(dataForTemplate.items[3].url);
    
}

const findImg = function(poster) {
    const posterSearch = fetch(`https://image.tmdb.org/t/p/w300${poster}`)
        .then((list) => (addImgInArr(list.url)))
        

}

export const getDetails = function(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        .then((list) => list.json())
        // .then((list) => console.log(list));
}


// при вызове популярных так же срабатывают и другие функции как при обычном поиске
export const getPopular = function() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`)
        .then((list) => list.json())
        .then((list) => {
            dataForTemplate.items = list.results;
            getFilmsByWord(list.results)
        });
}

// getDetails(2734)
getPopular()

