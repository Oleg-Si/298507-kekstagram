'use strict';

(function () {
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
  window.data = {
    getFragment: function () {
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
    }
  };
})();
