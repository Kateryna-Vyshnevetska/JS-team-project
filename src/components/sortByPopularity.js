// import { res } from "./services/services.js";
import refs from "../options/refs.js";
// import { getFilmsByWord } from "./services/services.js";

// function compareNumbers(a, b) {
//   return b - a;
// }

const sortByPopularity = (ev) => {
  refs.sortBtn.classList.toggle('is-active'); 
  // let res = getFilmsByWord();
  // console.log(res);
  // return res
  //   .map((el) => el.popularity)
  //   .sort([compareNumbers])
  //   .reverce();
};

refs.sortBtn.addEventListener("click", sortByPopularity);
