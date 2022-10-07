let navMainList = document.querySelector('.cite-list');
let navUserList = document.querySelector('.user-list');
let popoverCity = document.querySelector('.popover--city');
let popoverToggle = document.querySelector('.user-list__link--city');
let navToggle = document.querySelector('.navigation__toggle');

//Burger-menu
navToggle.addEventListener('click', function () {
  if (navToggle.classList.contains('navigation__toggle--closed')) {
    navToggle.classList.remove('navigation__toggle--closed');
    navToggle.classList.add('navigation__toggle--opened');
  } else {
    navToggle.classList.add('navigation__toggle--closed');
    navToggle.classList.remove('navigation__toggle--opened')
  }

  navMainList.classList.toggle('cite-list--visible')
  navUserList.classList.toggle('user-list--visible')
});

//Popover-citySearch
popoverToggle.addEventListener('click', function () {
  popoverCity.classList.toggle('popover--active')
})

//Scrollbar menu-cite
let cityItemLast = document.querySelector(".cite-list__item--last");
let cityItemFirst = document.querySelector("#first");
let slide = document.querySelector(".cite-list__item");
let prevButton = document.querySelector(".navigation__slider-button--prev");
let nextButton = document.querySelector(".navigation__slider-button--next");

nextButton.addEventListener('click', function () {
  let slideWidth = slide.clientWidth;
  navMainList.scrollLeft += slideWidth;
  cityItemFirst.classList.add('cite-list__item--first');
  nextButton.classList.add('navigation__slider-button--active');
  prevButton.classList.remove('navigation__slider-button--active');
  cityItemLast.classList.remove('cite-list__item--last');
});

prevButton.addEventListener('click', function () {
  let slideWidth = slide.clientWidth;
  navMainList.scrollLeft -= slideWidth;
  prevButton.classList.add('navigation__slider-button--active');
  nextButton.classList.remove('navigation__slider-button--active');
  cityItemFirst.classList.remove('cite-list__item--first');
});


// Search city
let searchCity = document.getElementById('search-city');
let cityList = document.getElementById('city-list');
let searchResults = '';

function readText(file, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('application/json');
  rawFile.open('GET', file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == '200') {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

// //usage:
const showList = () => {
  readText('../data/russian-cities.json', function (text) {
    let dataList = JSON.parse(text);
    console.log(dataList);

    cityList.innerHTML = '';
    dataList
      .filter((item) => {
        return (
          item.name.toLowerCase().includes(searchResults) ||
          item.subject.toLowerCase().includes(searchResults)
        );
      })
      .forEach((e) => {
        const li = document.createElement('li');
        li.classList.add('popover__item');
        li.innerHTML = `<a class="popover__link">${e.name}</a><span class="popover__subject">${e.subject}</span>`;
        cityList.appendChild(li);
      });
  });
};

showList();

searchCity.addEventListener('input', (event) => {
  searchResults = event.target.value.toLowerCase().trim();
  showList();
});
