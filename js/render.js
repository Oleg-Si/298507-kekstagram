'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var filters = document.querySelector('.filters');
  var pictures = document.querySelector('.pictures');

  var renderPicture = function (picturesData) {
    var template = document.querySelector('#picture-template').content.querySelector('.picture');

    template.setAttribute('tabindex', 0);
    template.children[0].setAttribute('src', picturesData.url);
    template.querySelector('.picture-likes').textContent = picturesData.likes;
    template.querySelector('.picture-comments').textContent = picturesData.comments.length;
    var element = template.cloneNode(true);

    return element;
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getValue = function (arr) {
    var ind = getRandomInt(1, 5);
    if (arr.indexOf(ind) >= 0) {
      getValue(arr);
    }
    return ind;
  };

  window.render = {
    addData: function (data) {
      for (var i = 0; i < 25; i++) {
        fragment.appendChild(renderPicture(data[i]));
      }
      pictures.appendChild(fragment);

      filters.classList.remove('hidden');
    },
    clearData: function () {
      var pictureOpen = document.querySelectorAll('.picture');
      for (var i = 0; i < 25; i++) {
        pictures.removeChild(pictureOpen[i]);
      }
    },
    randomData: function (data) {
      var arr = [];
      for (var i = 0; i < 25; i++) {
        debugger;
        var totalValue = getValue(arr);
        arr.push(totalValue);
        fragment.appendChild(renderPicture(data[totalValue]));
      }
      pictures.appendChild(fragment);
    }
  };
})();
