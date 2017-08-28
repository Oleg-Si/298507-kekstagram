'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var template = document.querySelector('#picture-template').content.querySelector('.picture');

// Находим рандомное число в диапазоне
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Генерируем массив комментариев
var getCommentsNumbers = function () {
  var commentsNumbers = [];
  var commentsCount = getRandomInt(1, 3);
  for (var i = 1; i <= commentsCount; i++) {
    commentsNumbers[i - 1] = COMMENTS_LIST[getRandomInt(0, 6)];
  }
  return commentsNumbers;
};

// Генерируем массив
var generateArray = function () {
  var result = [];
  for (var i = 0; i < 25; i++) {
    var myKekstagramItem = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(15, 201),
      comments: getCommentsNumbers().length
    };
    result.push(myKekstagramItem);
  }
  return result;
};

var myKekstagram = generateArray();

// Наполняем фрагмент елементами
var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 25; i++) {
    template.setAttribute('tabindex', 0);
    template.children[0].setAttribute('src', myKekstagram[i].url);
    template.querySelector('.picture-likes').textContent = myKekstagram[i].likes;
    template.querySelector('.picture-comments').textContent = myKekstagram[i].comments;
    var element = template.cloneNode(true);
    fragment.appendChild(element);
  }
  return fragment;
};

var fragment = getFragment();

// Вставляем фрагмент
var insertFragment = function () {
  var pictures = document.querySelector('.pictures');
  pictures.appendChild(fragment);
};

insertFragment();

var galleryOverlay = document.querySelector('.gallery-overlay');

// Наполняем первый элемент данными
var showGalleryContent = function (i) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', myKekstagram[i].url);
  galleryOverlay.querySelector('.likes-count').textContent = myKekstagram[i].likes;
  galleryOverlay.querySelector('.comments-count').textContent = myKekstagram[i].comments;
};

var pictureOpen = document.querySelectorAll('.picture');
var pictureClosed = document.querySelector('.gallery-overlay-close');
pictureClosed.setAttribute('tabindex', 0);

// Обработчик нажатия кнопки Esc на галерее
var onGalleryEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideGallery();
  }
};

// Показываем галерею
var showGallery = function () {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onGalleryEscPress);
};

// Скрываем галерею
var hideGallery = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onGalleryEscPress);
};

// Добавляем обработчики клика мыши и кнопки
for (var i = 0; i < myKekstagram.length - 1; i++) {
  pictureOpen[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    showGalleryContent(i);
    showGallery();
  });
  pictureOpen[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      showGalleryContent(i);
      showGallery();
    }
  });
}

// Добавляем обработчик клика мыши
pictureClosed.addEventListener('click', function (evt) {
  hideGallery();
});

// Добавляем обработчик клика кнопки
pictureClosed.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideGallery();
  }
});
