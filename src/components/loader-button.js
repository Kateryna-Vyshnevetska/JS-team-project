const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const loadMoreBtnLabel = loadMoreBtn.querySelector(" .label");
const loadMoreBtnSpinner = loadMoreBtn.querySelector(" .spinner");

export default { loadMoreBtn, loadMoreBtnLabel, loadMoreBtnSpinner };

const loadMoreBtn = {
  enable() {
    loadMoreBtn.disabled = false;
    loadMoreBtnLabel = "Показать еще...";
    loadMoreBtnSpinner.classList.add("is-hidden");
  },
  disable() {
    loadMoreBtn.disabled = true;
    loadMoreBtnLabel = "Загружаем...";
    loadMoreBtnSpinner.classList.remove("is-hidden");
  },
  show() {
    loadMoreBtn.classList.remove("is-hidden");
  },
};
