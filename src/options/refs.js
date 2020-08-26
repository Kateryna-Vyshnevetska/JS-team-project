const refs = {
  body: document.querySelector("body"),
  header: document.querySelector(".header"),
  search: document.querySelector(".search"),
  searchInfo: document.querySelector(".searchInfo"),
  searchIconRef: document.querySelector(".search-icon"),
  listFilms: document.querySelector(".list-film"),
  pageHomeRef: document.querySelector(`[data-nav-choice="home"]`),
  pageMyLibraryRef: document.querySelector(`[data-nav-choice="my-library"]`),
  buttonListRef: document.querySelector(
    `[data-button-list-header="watched-and-queue"]`
  ),
  inputSearchRef: document.querySelector(".input-search"),
};

export default refs;
