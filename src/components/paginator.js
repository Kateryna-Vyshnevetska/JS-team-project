import Pagination from "tui-pagination";
import "tui-pagination/dist/tui-pagination.css";
import { filmsSearch } from "./services/services.js";

const paginatorOptions = {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 7,
  centerAlign: true,
};

var pagination2 = new Pagination(
  document.getElementById("pagination2"),
  paginatorOptions
);

const pagintaionRef = document.querySelector(".tui-pagination");

pagintaionRef.addEventListener("click", (event) => {
  filmsSearch(event.target.textContent);
});
