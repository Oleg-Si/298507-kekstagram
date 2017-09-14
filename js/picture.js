'use strict';

(function () {
  var photos = [];

  var onSuccess = function (downloadData) {
    photos = downloadData;
    window.render.addData(photos);
    window.gallery.addListener();
  };

  // Сортировка популярные
  var onClickPopular = function () {
    window.render.clearData();
    window.render.addData(photos.slice().sort(function (first, second) {
      if (first.likes < second.likes) {
        return 1;
      } else if (first.likes > second.likes) {
        return -1;
      } else {
        return 0;
      }
    }));
    window.gallery.addListener();
  };

  // Сортировка рекоммендуемые
  var onClickRecommend = function () {
    window.render.clearData();
    window.render.addData(photos);
    window.gallery.addListener();
  };

  // Сортировка обсуждаемые
  var onClickDiscuss = function () {
    window.render.clearData();
    window.render.addData(photos.slice().sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }
    }));
    window.gallery.addListener();
  };

  // Сортировка случайные
  var onClickRandom = function () {
    window.render.clearData();
    window.render.randomData(photos.slice());
    window.gallery.addListener();
  };

  var filterPopular = document.querySelector('#filter-popular');
  var filterRecommend = document.querySelector('#filter-recommend');
  var filterDiscuss = document.querySelector('#filter-discussed');
  var filterRandom = document.querySelector('#filter-random');

  filterPopular.addEventListener('click', function () {
    window.debounce(onClickPopular);
  });
  filterRecommend.addEventListener('click', function () {
    window.debounce(onClickRecommend);
  });
  filterDiscuss.addEventListener('click', function () {
    window.debounce(onClickDiscuss);
  });
  filterRandom.addEventListener('click', function () {
    window.debounce(onClickRandom);
  });

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadImage = uploadForm.querySelector('.upload-image');

  // Блок ошибки
  var onError = function (message) {
    var nodeError = document.createElement('div');
    nodeError.style = 'z-index: 100';
    nodeError.style.position = 'absolute';
    nodeError.style.width = '100%';
    nodeError.style.height = '30px';
    nodeError.style.fontSize = '20px';
    nodeError.style.textAlign = 'center';
    nodeError.style.backgroundColor = 'red';
    nodeError.textContent = message;
    document.body.insertAdjacentElement('afterbegin', nodeError);
  };

  window.backend.load(onSuccess, onError);

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), function () {
      uploadOverlay.classList.add('hidden');
      uploadImage.classList.remove('hidden');
      window.form.reset();
    }, onError);
  });


})();
