'use strict';

(function () {
  var allData = [];

  var onSuccess = function (picturesData) {
    allData = picturesData;
    window.render.addData(allData);
    window.gallery.addListener();
  };

  var onClickPopular = function () {
    window.render.clearData();
    window.render.addData(allData.slice().sort(function (first, second) {
      if (first.likes < second.likes) {
        return 1;
      } else if (first.likes > second.likes) {
        return -1;
      } else {
        return 0;
      }
    }));
  };

  var onClickRecommend = function () {
    window.render.clearData();
    window.render.addData(allData);
  };

  var onClickDiscuss = function () {
    window.render.clearData();
    window.render.addData(allData.slice().sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }
    }));
  };

  var onClickRandom = function () {
    window.render.clearData();
    window.render.randomData(allData);
  };

  var filters = document.querySelector('.filters');
  var filterPopular = filters.querySelector('#filter-popular');
  var filterRecommend = filters.querySelector('#filter-recommend');
  var filterDiscuss = filters.querySelector('#filter-discussed');
  var filterRandom = filters.querySelector('#filter-random');

  filterPopular.addEventListener('click', onClickPopular);
  filterRecommend.addEventListener('click', onClickRecommend);
  filterDiscuss.addEventListener('click', onClickDiscuss);
  filterRandom.addEventListener('click', onClickRandom);

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

  var resetForm = function () {
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

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), function () {
      uploadOverlay.classList.add('hidden');
      uploadImage.classList.remove('hidden');
      resetForm();
    }, onError);
  });
})();
