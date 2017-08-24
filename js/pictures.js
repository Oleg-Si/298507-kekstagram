'use strict';

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

var getCommentsNumbers = function () {
  var commentsNumbers = [];
  var commentsCount = getRandomInt(1, 3);
  for (var i = 1; i <= commentsCount; i++) {
    commentsNumbers[i - 1].appendChild(COMMENTS_LIST[getRandomInt(0, 6)]);
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
    result[i] = myKekstagramItem;
  }
  return result;
};

var myKekstagram = generateArray();

// Наполняем фрагмент елементами
var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 25; i++) {
    var element = template.cloneNode(true);
    element.children[0].setAttribute('src', myKekstagram[i].url);
    element.querySelector('.picture-likes').textContent = myKekstagram[i].likes;
    element.querySelector('.picture-comments').textContent = myKekstagram[i].comments;
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

var hideForm = document.querySelector('.upload-overlay');
hideForm.classList.add('hidden');

var showGallery = document.querySelector('.gallery-overlay');
showGallery.classList.remove('hidden');


var showGalleryContent = function () {
  showGallery.querySelector('.gallery-overlay-image').setAttribute('src', myKekstagram[0].url);
  showGallery.querySelector('.likes-count').textContent = myKekstagram[0].likes;
  showGallery.querySelector('.comments-count').textContent = myKekstagram[0].comments;
};

showGalleryContent();
