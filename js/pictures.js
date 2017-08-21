'use strict';

var myKekstagram = [];
var commentsList = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

// Находим рандомное число в диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Генерируем массив
function generateArray() {
  for (var i = 0; i < 25; i++) {
    var myKekstagramItem = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(15, 201),
      comments: commentsList[getRandomInt(0, 6)]
    };
    myKekstagram[i] = myKekstagramItem;
  }
}

generateArray();

console.log(myKekstagram)
