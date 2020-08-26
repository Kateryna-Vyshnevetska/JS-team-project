import {getIDFromIMG} from './modal.js'

// =======================
// Эти массивы придется удалить, они обьявлены пустыми и при каждом новом входе очищают данные storage
// нужно исп. нижние функции для получения текущего storage только значения записывать в массыв

//------watched
let watchedMovies = [];
const watched = "watched"
let uppdateList = [];

//------queue 
let queueMovies = [];
const queue = "queue"
let uppdateListQ = [];


// переменная для хранения твоего id между функциями
let idMovie;


// Для очистки всего
// localStorage.clear();


//====================================
// вот пример, как проверить хранилище, взять данные, и записать. Нужно сделать с Try catch
// эти две фун-и можно переиспользовать, с разными ключами W и Q 
// осталось распылить все взятые значения в массив и передлавать его как значение
const load = key => {
    try {
      const serializedState = localStorage.getItem(key);
  
      return serializedState === null ? '' : JSON.parse(serializedState);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  };

const save = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error('Set state error: ', err);
    }
  };

// ======================================
//------watched-functions
const check = function (event) {
    const id = refs.id.value;
    saveMovie(watched, id);
};

const saveMovie = (value, id) => {
    // Как правильно использовать хранилище
    // нужно добавить только запись с массив
    load(value);
    save(value, id)
    // watchedMovies.push(Number(id));
    // sendId(value, watchedMovies);
    // uppdateList = [...watchedMovies];
};

const checkDelete = function () {
    const value = refs.value.value;
    const findIndex = uppdateList.indexOf(Number(value));
    console.log(findIndex);
    uppdateList.splice(findIndex, 1);
    sendId(watched, uppdateList);
    console.log(watchedMovies);
    console.log(uppdateList);
};

//-------queue-functions
const checkQueue = function (event) {
    const idQ = refs.idQ.value;
    saveQueue(queue, idQ);
};

const saveQueue = (valueQ, id) => {
    queueMovies.unshift(Number(id));
    sendId(valueQ, queueMovies);
    uppdateListQ = [...queueMovies];
};

const checkDeleteQueue = function () {
    const valueQ = refs.valueQ.value;
    const findIndexQ = uppdateListQ.indexOf(Number(valueQ));
    uppdateListQ.splice(findIndexQ, 1);
    sendId(queue, uppdateListQ);
};

//------general-function
const sendId = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// =============================================
// Вот все слушатели, достучалась до всех кнопок

export function write(some) {
    idMovie = some;
    const allBtn = document.querySelector('.card-button__wrapper');
    allBtn.addEventListener('click', checkClickBtn);
}

const checkClickBtn = (ev) => {
    if(ev.target.dataset.name === 'watched'){
        console.log(ev.target);
    }
    else if(ev.target.dataset.name === 'queue'){
        console.log(ev.target);

    }
    else if(ev.target.dataset.name === 'trailer'){
        // тут пока ничего не делай
        console.log(ev.target);
    }
}