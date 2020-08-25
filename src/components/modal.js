import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css";
// import filmCardTpl from '../templates/film-card.hbs'

export function openModal(event){
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

