const menuButton = document.querySelector('.icon-hamburger');
const menuIcon = document.querySelector('.icon-hamburger img');
const navBar = document.querySelector('.nav-bar');
const overlay = document.querySelector('.overlay');

const carouselInner = document.querySelector('.carousel-inner');
const getX = (e) => e.pageX || e.touches[0].pageX;
const carouselArrBtns = document.querySelectorAll('.carousel-btns');
let carouselCardWidth = document.querySelector('.carousel-card').offsetWidth;

const carouselChildrens = [...carouselInner.children];
let isDragging = false,
  startX,
  startScrollLeft;

let cardPerView = Math.round(carouselInner.offsetWidth / carouselCardWidth);
let menuHidden = true;

window.addEventListener('resize', () => {
  carouselCardWidth = document.querySelector('.carousel-card').offsetWidth;
});

menuButton.addEventListener('click', () => {
  if (menuHidden) {
    navBar.classList.remove('mobile-hidden');
    overlay.classList.remove('hidden');
    menuIcon.src = './images/icon-close.svg';
    document.documentElement.style.overflow = 'hidden';
    menuHidden = false;
  } else {
    navBar.classList.add('mobile-hidden');
    overlay.classList.add('hidden');
    menuIcon.src = './images/icon-hamburger.svg';
    document.documentElement.style.overflow = '';
    menuHidden = true;
  }
});

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carouselInner.insertAdjacentHTML('afterbegin', card.outerHTML);
  });
carouselChildrens
  .slice(0, cardPerView)
  .reverse()
  .forEach((card) => {
    carouselInner.insertAdjacentHTML('beforeend', card.outerHTML);
  });

carouselArrBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log(btn.id);
    carouselInner.scrollLeft +=
      btn.id === 'carousel-left' ? -carouselCardWidth : carouselCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carouselInner.classList.add('dragging');
  startX = getX(e);
  startScrollLeft = carouselInner.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carouselInner.scrollLeft = startScrollLeft - (getX(e) - startX);
};
const dragStop = () => {
  isDragging = false;
  carouselInner.classList.remove('dragging');
};

const infiniteScroll = () => {
  if (carouselInner.scrollLeft === 0) {
    carouselInner.classList.add('no-transition');
    carouselInner.scrollLeft =
      carouselInner.scrollWidth - 2 * carouselInner.offsetWidth;
    carouselInner.classList.remove('no-transition');
    console.log("You've reached the left end");
  } else if (
    Math.ceil(carouselInner.scrollLeft) ===
    carouselInner.scrollWidth - carouselInner.offsetWidth
  ) {
    carouselInner.classList.add('no-transition');
    carouselInner.scrollLeft = carouselInner.offsetWidth;
    carouselInner.classList.remove('no-transition');
  }
};

carouselInner.addEventListener('mousedown', dragStart);
carouselInner.addEventListener('touchstart', dragStart);
carouselInner.addEventListener('mousemove', dragging);
carouselInner.addEventListener('touchmove', dragging);
document.addEventListener('mouseup', dragStop);
document.addEventListener('touchend', dragStop);
carouselInner.addEventListener('scroll', infiniteScroll);
