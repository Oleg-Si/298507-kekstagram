'use strict';

(function () {
  var ARRAY_LENGTH = 25;

  var fragment = document.createDocumentFragment();
  var filters = document.querySelector('.filters');
  var pictures = document.querySelector('.pictures');
  var template = document.querySelector('#picture-template').content.querySelector('.picture');

  var renderPicture = function (picturesData) {
    var element = template.cloneNode(true);

    element.setAttribute('tabindex', 0);
    element.children[0].setAttribute('src', picturesData.url);
    element.querySelector('.picture-likes').textContent = picturesData.likes;
    element.querySelector('.picture-comments').textContent = picturesData.comments.length;

    return element;
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.render = {
    addData: function (data) {
      for (var i = 0; i < ARRAY_LENGTH; i++) {
        fragment.appendChild(renderPicture(data[i]));
      }
      pictures.appendChild(fragment);

      filters.classList.remove('hidden');
    },
    clearData: function () {
      pictures.innerHTML = '';
    },
    randomData: function (data) {
      for (var i = data.length - 1; i > 0; i--) {
        var ind = getRandomInt(0, i);
        var element = data.splice(ind, 1);
        fragment.appendChild(renderPicture(element[0]));
      }
      pictures.appendChild(fragment);
    }
  };
})();
