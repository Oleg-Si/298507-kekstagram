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
      for (var i = 0; i < pictureOpen.length; i++) {
        pictures.removeChild(pictureOpen[i]);
      }
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
