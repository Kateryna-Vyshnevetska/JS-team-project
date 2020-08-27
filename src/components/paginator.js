import Pagination from "tui-pagination";
import "../../src/tui-pagination.css";
import { filmsSearch } from "./services/services.js";
import refs from "../options/refs.js";

const paginatorOptions = {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: getVisiblePagesCount(),
  centerAlign: true,
};

var pagination2 = new Pagination(
  document.getElementById("pagination2"),
  paginatorOptions
);

export function setPaginator() {
  page = event.target.textContent;
  filmsSearch(page);
}

export let page = 1;

refs.paginationRef.addEventListener("click", setPaginator);

function getVisiblePagesCount() {
  if (document.body.clientWidth <= 767) {
    return 5;
  } else {
    return 7;
  }
}
