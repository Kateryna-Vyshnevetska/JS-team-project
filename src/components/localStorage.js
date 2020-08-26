//------watched
let watchedMovies = [];
const watched = "watched"
let uppdateList = [];

//------queue 
let queueMovies = [];
const queue = "queue"
let uppdateListQ = [];


//------watched-functions
const check = function (event) {
    const id = refs.id.value;
    saveMovie(watched, id);
};

const saveMovie = (value, id) => {
    watchedMovies.push(Number(id));
    sendId(value, watchedMovies);
    uppdateList = [...watchedMovies];
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

