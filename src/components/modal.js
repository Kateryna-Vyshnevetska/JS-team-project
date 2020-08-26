import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css";

import filmCardTpl from '../template/film-card.hbs'
const mainFilmList = document.querySelector('.list-film')


export function openModal(event){
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

mainFilmList.addEventListener('click', openModal)