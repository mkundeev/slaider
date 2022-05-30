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
  constructor(slides, select, { loop, navs, pags, auto, delay }) {
    this.slides = slides;
    this.parentEl = document.querySelector(select);
    this.loop = loop;
    this.navs = navs;
    this.pags = pags;
    this.auto = auto;
    this.delay = delay;
  }
  init() {
    if (this.navs) {
      this.addNavs();
    }
    if (this.pags) {
      this.addPags();
    }
  }
  addNavs() {
    this.parentEl.querySelector(".button-list").hidden = false;
  }
  addPags() {
    console.log(12345);
    this.parentEl.querySelector(".dots-list").hidden = false;
  }
}

const slider = new Slider(slides, "#slider", {
  loop: true,
  navs: true,
  pags: true,
  auto: true,
  delay: 3,
});

slider.init();
