const refs = {
  body: document.querySelector("body"),
  header: document.querySelector(".header"),
  //   search: document.querySelector(".input-search"),
  searchInfo: document.querySelector("#notify-text"),
  searchIconRef: document.querySelector(".search-icon"),
  listFilms: document.querySelector(".list-film"),
  pageHomeRef: document.querySelector(`[data-nav-choice="home"]`),
  pageMyLibraryRef: document.querySelector(`[data-nav-choice="my-library"]`),
  buttonListRef: document.querySelector(
    `[data-button-list-header="watched-and-queue"]`
  ),
  inputSearchRef: document.querySelector(".input-search"),
  sortBtn: document.querySelector(".sort-button.first"),
  paginationRef: document.querySelector(".tui-pagination"),
};

export default refs;
