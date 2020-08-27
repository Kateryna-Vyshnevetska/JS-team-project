import { API_KEY } from "../options/apikey.js";

var Carousel = function (
  frameSelector,
  sliderSelector,
  slidesSelector,
  btnLeftSelector,
  btnRightSelector
) {
  //A variable to store the position of the slides
  var position = 0;
  var frame = document.querySelector(frameSelector);
  var slides = document.querySelectorAll(slidesSelector);
  //Get the number of slides in the slider
  var slidesNumber = slides.length;
  var leftButton = document.querySelector(btnLeftSelector);
  var rightButton = document.querySelector(btnRightSelector);
  var slider = document.querySelector(sliderSelector);

  //Add classes to frame and slider divs
  frame.classList.add("frame");
  slider.classList.add("slider");

  //Event listeners for when the user clicks on the arrows
  leftButton.addEventListener("click", function () {
    carousel.left();
  });

  rightButton.addEventListener("click", function () {
    carousel.right();
  });

  //Function that moves the slides left or right depending on variable value
  //Moves to the next slide if value is -1, moves to the previous is value is 1

  var moveSlide = function (value) {
    position += value * 200;
    slider.style.left = position + "px";
    slider.style.right = position + "px";
  };

  return {
    //Function to move to next slide
    right: function () {
      console.log(position);
      if (position) {
        moveSlide(-1);
      } else {
        position = slidesNumber - 1;
        slider.style.right = position + "px";
      }
    },
    //Function to go to previous slide
    left: function () {
      console.log(position);
      if (position > -4001) {
        moveSlide(1);
      } else {
        position = slidesNumber - 1;
        slider.style.left = position + "px";
      }
    },
  };
};

//Create new instance of Carousel
var carousel = new Carousel(
  "#frame",
  "#slider",
  "#slider .slide",
  ".arrowLeft",
  ".arrowRight"
);

const getUpcomingFilms = function () {
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((list) => list.json())
    .then((list) => {
      console.log(list.results);

      const listRef = document.querySelector("#slider");

      list.results.map((el) => {
        listRef.innerHTML += `<div class="slider-box slide">
                  <div class="slider-photo">
                    <a href="#" class="carousel-link">
                      <img src="https://image.tmdb.org/t/p/w200${el.poster_path}" class="img-carousel" />
                    </a>
                    <p class="release-date">В прокате</br>"${el.release_date}"</p>
                  </div>`;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

getUpcomingFilms();
