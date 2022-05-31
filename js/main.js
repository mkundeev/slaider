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
    this.index = 0;
  }
  init() {
    if (this.navs) {
      this.addNavs();
    }
    if (this.pags) {
      this.addPags();
    }
  }
 onClickBtn = e => {
    console.log(this)
    const element = e.target;
    console.dir(element.classList.contains("arrow-prev"));
    if (element.classList.contains("arrow-prev")) {
      this.index -= 1;
      this.indexCheck()
      this.changeSlide()
    }
    if (element.classList.contains("arrow-next")) {
      this.index += 1;
      this.indexCheck()
      this.changeSlide()
    }
  }
  addNavs() {
    this.parentEl.querySelector(".button-list").hidden = false;
    this.parentEl.addEventListener("click", this.onClickBtn);
  }
  addPags() {
    console.log(12345);
    this.parentEl.querySelector(".dots-list").hidden = false;
  }


  changeSlide() {
  
    const quarentImage = this.parentEl.querySelector('.slider-image');
    const imageDescription = this.parentEl.querySelector('.slider-image-title')
    const { img, text } =  this.slides[this.index]
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
        this.index = this.slides.length - 1
      }else if (this.index < 0) {
        this.index = 0;
      }
    }
    
  }


  
}

const slider = new Slider(slides, "#slider", {
  loop: false,
  navs: true,
  pags: true,
  auto: true,
  delay: 3,
});

slider.init();
