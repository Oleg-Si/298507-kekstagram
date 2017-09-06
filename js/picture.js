'use strict';

(function () {
  var renderPicture = function (picturesData) {
    var template = document.querySelector('#picture-template').content.querySelector('.picture');

    template.setAttribute('tabindex', 0);
    template.children[0].setAttribute('src', picturesData.url);
    template.querySelector('.picture-likes').textContent = picturesData.likes;
    template.querySelector('.picture-comments').textContent = picturesData.comments.length;
    var element = template.cloneNode(true);

    return element;
  };

  var onSuccess = function (picturesData) {
    var fragment = document.createDocumentFragment();
    var pictures = document.querySelector('.pictures');
    for (var i = 0; i < 25; i++) {
      fragment.appendChild(renderPicture(picturesData[i]));
    }
    pictures.appendChild(fragment);

    window.gallery.addListener();
  };

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

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), function () {
      uploadOverlay.classList.add('hidden');
      uploadImage.classList.remove('hidden');
      uploadFormHashtags.value = '';
      uploadFormDescr.value = '';
      resizeControlsLabel.value = '100%';
      uploadImageScale.style.filter = 'none';
      uploadImageScale.style.transform = 'scale(1)';
      var startPinPosition = 20;
      var startValPosition = 20;
      uploadEffectLevelPin.style.left = startPinPosition + '%';
      uploadEffectLevelVal.style.width = startValPosition + '%';
      uploadEffectNone.setAttribute('checked', '');
    }, onError);
  });
})();
