'use strict';

(function () {
  var data = [];

  var onSuccess = function (downloadData) {
    data = downloadData;
    window.render.addData(data);
    window.gallery.addListener();
  };

  // Сортировка популярные
  var onClickPopular = function () {
    window.render.clearData();
    window.render.addData(data.slice().sort(function (first, second) {
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
    window.render.addData(data);
    window.gallery.addListener();
  };

  // Сортировка обсуждаемые
  var onClickDiscuss = function () {
    window.render.clearData();
    window.render.addData(data.slice().sort(function (first, second) {
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
    window.render.randomData(data.slice());
    window.gallery.addListener();
  };

  var filters = document.querySelector('.filters');
  var filterPopular = filters.querySelector('#filter-popular');
  var filterRecommend = filters.querySelector('#filter-recommend');
  var filterDiscuss = filters.querySelector('#filter-discussed');
  var filterRandom = filters.querySelector('#filter-random');

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
  var uploadFormHashtags = uploadForm.querySelector('.upload-form-hashtags');
  var uploadFormDescr = uploadForm.querySelector('.upload-form-description');
  var resizeControlsLabel = uploadForm.querySelector('.upload-resize-controls-value');
  var uploadImageScale = uploadForm.querySelector('.effect-image-preview');
  var uploadEffectLevel = uploadForm.querySelector('.upload-effect-level');
  var uploadEffectLevelPin = uploadEffectLevel.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelVal = uploadEffectLevel.querySelector('.upload-effect-level-val');
  var uploadEffectNone = uploadOverlay.querySelector('#upload-effect-none');

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
      window.picture();
    }, onError);
  });

  // Сбрасываем данные формы
  window.picture = function () {
    uploadFormHashtags.value = '';
    uploadFormDescr.value = '';
    resizeControlsLabel.setAttribute('value', '100%');
    uploadImageScale.className = 'effect-image-preview';
    uploadImageScale.style.filter = 'none';
    uploadImageScale.style.transform = 'scale(1)';
    var startPinPosition = 20;
    var startValPosition = 20;
    uploadEffectLevelPin.style.left = startPinPosition + '%';
    uploadEffectLevelVal.style.width = startValPosition + '%';
    uploadEffectNone.checked = true;
    uploadEffectLevel.classList.add('hidden');
  };
})();
