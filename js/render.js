'use strict';

(function () {
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
      data.forEach(function (element) {
        fragment.appendChild(renderPicture(element));
      });
      pictures.appendChild(fragment);
      filters.classList.remove('hidden');
    },
    clearData: function () {
      pictures.innerHTML = '';
    },
    randomData: function (data) {
      for (var i = data.length; i > 0; i--) {
        var ind = getRandomInt(0, i);
        var element = data.splice(ind, 1);
        fragment.appendChild(renderPicture(element[0]));
      }
      pictures.appendChild(fragment);
    }
  };
})();
