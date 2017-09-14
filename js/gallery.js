'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var pictureClosed = galleryOverlay.querySelector('.gallery-overlay-close');
  pictureClosed.setAttribute('tabindex', 0);

  // Обработчик нажатия кнопки Esc на галерее
  var onEscPressGallery = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onClickPictureClosed();
    }
  };

    // Показываем галерею
  var onClickPictureOpen = function (evt) {
    evt.preventDefault();
    var usedContent = window.preview.getGalleryContent(evt);
    window.preview.showGalleryContent(usedContent);
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscPressGallery);
  };

  // Скрываем галерею
  var onClickPictureClosed = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscPressGallery);
  };

  // Добавляем обработчик клика мыши
  pictureClosed.addEventListener('click', onClickPictureClosed);

  // Добавляем обработчик клика кнопки
  pictureClosed.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onClickPictureClosed();
    }
  });

  window.gallery = {
    // Добавляем обработчики клика мыши и кнопки
    addListener: function () {
      var pictureOpen = document.querySelectorAll('.picture');
      for (var i = 0; i < pictureOpen.length; i++) {
        pictureOpen[i].addEventListener('click', function (evt) {
          onClickPictureOpen(evt);
        });
        pictureOpen[i].addEventListener('keydown', function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            onClickPictureOpen(evt);
          }
        });
      }
    }
  };
})();
