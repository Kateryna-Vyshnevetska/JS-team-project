import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css";
import {write} from './localStorage.js';
import filmCardTpl from '../template/film-card.hbs'
const mainFilmList = document.querySelector('.list-film')


export function openModal(event){
    // DON`T DELETE
    write(event.target.dataset.id);

    console.log(event.target.nodeName);
    // if(event.target.nodeName !== 'IMG'){
    //     return
    // }else{
    //     const instance = basicLightbox.create(
       //     instance.show()

    // }
    let markup = filmCardTpl()
    const instance = basicLightbox.create(markup)
    instance.show()
}

export function getIDFromIMG (id){
    return id;
}

mainFilmList.addEventListener('click', openModal)