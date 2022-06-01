// Функционал:

// кнопки далее и назад
// подпись текста к каждому слайду
// вывод номера и максимального количества (1/3,2/3,/3/3)
// пагинация (при клике - переключается на нужный слайд)
// Дополнительные параметры:

// loop - возможность листать слайдер по кругу (например когда на 3 слайде нажимаем далее - переходим на 1). true или false
// navs - Вывод стрелочек или их отключение. true или false
// pags - вывод пагинации или отключение. true или fal
// auto - слайдер сам переключается, если delay не указан, раз в 5 сек.А
// stopMouseHover - если навести мышкой на слайд, он не переключается, как только мышку убрали, снова пошло. Работает только когда auto равен true. true или false
// delay - время в секундах на показ слайда, если auto true

import { slides } from "./data.js";

class Slider {
  constructor(slides, select, { loop, navs, pags, auto, delay = 5000 }) {
    this.slides = slides;
    this.parentEl = document.querySelector(select);
    this.loop = loop;
    this.navs = navs;
    this.pags = pags;
    this.auto = auto;
    this.delay = delay;
    this.index = 0;
  }
  init() {
    if (this.navs) {
      this.addNavs();
    }
    if (this.pags) {
      this.addPags();
      this.parentEl.addEventListener("click", this.onClickDots.bind(this));
    }
    if (this.auto) {
      this.onTimeChange();
    }
    this.counter();
  }
  onClickBtn = (e) => {
    const element = e.target;
    if (element.classList.contains("arrow-prev")) {
      this.index -= 1;
      this.indexCheck();
      this.changeSlide();
      this.updateIsActiveDots();
      this.counter();
    }
    if (element.classList.contains("arrow-next")) {
      this.index += 1;
      this.indexCheck();
      this.changeSlide();
      this.updateIsActiveDots();
      this.counter();
    }
  };
  onClickDots(event) {
    if (event.target.classList.contains("btn-dot")) {
      this.index = Number(event.target.dataset.index);
      this.indexCheck();
      this.changeSlide();
      this.updateIsActiveDots();
      this.counter();
    }
  }
  addNavs() {
    this.parentEl.querySelector(".button-list").hidden = false;
    this.parentEl.addEventListener("click", this.onClickBtn);
  }
  addPags() {
    const markup = `
    <ul class="dots-list">
    ${this.slides
      .map(
        (el, index) =>
          `<li>
        <button type="button" data-index="${index}" class="btn-dot ${
            index === this.index ? "is-active" : ""
          }"></button>
      </li>`
      )
      .join("")}
    </ul>`;
    this.parentEl.insertAdjacentHTML("beforeend", markup);
  }
  updateIsActiveDots() {
    const test = this.parentEl.lastChild.querySelectorAll("button");
    test.forEach((element, index) => {
      if (element.classList.contains("is-active")) {
        element.classList.remove("is-active");
      }
      if (this.index === index) {
        element.classList.add("is-active");
      }
    });
  }
  changeSlide() {
    const quarentImage = this.parentEl.querySelector(".slider-image");
    const imageDescription = this.parentEl.querySelector(".slider-image-title");
    const { img, text } = this.slides[this.index];
    quarentImage.src = img;
    quarentImage.alt = text;
    imageDescription.textContent = text;
  }
  indexCheck() {
    if (this.loop) {
      if (this.index > this.slides.length - 1) {
        this.index = 0;
      } else if (this.index < 0) {
        this.index = this.slides.length - 1;
      }
    } else {
      if (this.index > this.slides.length - 1) {
        this.index = this.slides.length - 1;
      } else if (this.index < 0) {
        this.index = 0;
      }
    }
  }
  counter() {
    this.parentEl.querySelector(".slider-index").textContent = this.index + 1;
    this.parentEl.querySelector(".number-of-slides").textContent =
      this.slides.length;
  }
  onTimeChange() {
    setInterval(() => {
      this.index += 1
      this.indexCheck();
      this.changeSlide();
      this.updateIsActiveDots();
      this.counter();
    }, this.delay);
  }
}

const slider = new Slider(slides, "#slider", {
  loop: true,
  navs: true,
  pags: true,
  auto: false,
  delay: 5000,
});

slider.init();
