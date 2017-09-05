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
  };

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadImage = uploadForm.querySelector('.upload-image');
  var uploadFormSubmit = uploadForm.querySelector('.upload-form-submit');

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
    uploadOverlay.classList.add('hidden');
    uploadImage.classList.remove('hidden');
  };

  window.backend.load(onSuccess, onError);

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadFormSubmit), onError);
  });
})();
