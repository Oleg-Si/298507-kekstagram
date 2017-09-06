'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var pictureClosed = galleryOverlay.querySelector('.gallery-overlay-close');
  pictureClosed.setAttribute('tabindex', 0);

  // Обработчик нажатия кнопки Esc на галерее
  var onGalleryEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideGallery();
    }
  };

    // Показываем галерею
  var showGallery = function () {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryEscPress);
  };

  // Скрываем галерею
  var hideGallery = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onGalleryEscPress);
  };

  // Добавляем обработчик клика мыши
  pictureClosed.addEventListener('click', hideGallery);

  // Добавляем обработчик клика кнопки
  pictureClosed.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      hideGallery();
    }
  });

  window.gallery = {
    // Добавляем обработчики клика мыши и кнопки
    addListener: function () {
      var pictureOpen = document.querySelectorAll('.picture');
      for (var i = 0; i < 25; i++) {
        pictureOpen[i].addEventListener('click', function (evt) {
          evt.preventDefault();
          var usedContent = window.preview.getGalleryContent(evt);
          window.preview.showGalleryContent(usedContent);
          showGallery();
        });
        pictureOpen[i].addEventListener('keydown', function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            evt.preventDefault();
            var usedContent = window.preview.getGalleryContent(evt);
            window.preview.showGalleryContent(usedContent);
            showGallery();
          }
        });
      }
    }
  };
})();
