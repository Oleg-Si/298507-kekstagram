'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var RESIZE_MAX_VALUE = 100;
  var RESIZE_MIN_VALUE = 25;
  var RISIZE_VALUE_STEP = 25;
  var MAX_TARGET_WIDTH = 455;
  var MIN_TARGET_WIDTH = 0;

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadImage = uploadForm.querySelector('.upload-image');
  var uploadCancel = uploadForm.querySelector('.upload-form-cancel');
  var resizeControlsLabel = uploadForm.querySelector('.upload-resize-controls-value');
  var buttonResizeInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var buttonResizeDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
  var uploadImageScale = uploadForm.querySelector('.effect-image-preview');
  var uploadEffectControls = uploadForm.querySelector('.upload-effect-controls');
  var uploadFormHashtags = uploadForm.querySelector('.upload-form-hashtags');
  var uploadFormSubmit = uploadForm.querySelector('.upload-form-submit');
  var uploadEffectLevel = uploadEffectControls.querySelector('.upload-effect-level');
  var uploadEffectLevelPin = uploadEffectLevel.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelVal = uploadEffectLevel.querySelector('.upload-effect-level-val');
  var uploadFormDescr = uploadForm.querySelector('.upload-form-description');
  uploadFormDescr.setAttribute('tabindex', 0);

  // Скрываем поле эффектов
  uploadEffectLevel.classList.add('hidden');

  // Обработчик нажатия кнопки Esc на окне загрузки
  var onUploadEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (document.activeElement !== uploadFormDescr) {
        onClickUploadCancel();
      }
    }
  };

  var onChangeUploadForm = function () {
    uploadOverlay.classList.remove('hidden');
    uploadImage.classList.add('hidden');
    document.addEventListener('keydown', onUploadEscPress);
  };

  var onClickUploadCancel = function () {
    uploadOverlay.classList.add('hidden');
    window.picture();
    uploadImage.classList.remove('hidden');
    document.removeEventListener('keydown', onUploadEscPress);
  };

  uploadFile.addEventListener('change', onChangeUploadForm);

  uploadCancel.addEventListener('click', onClickUploadCancel);
  uploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onClickUploadCancel();
    }
  });

  // Изменяем размер фото
  var changeSizePhoto = function (direction) {
    var resizeControlsValue = parseInt(resizeControlsLabel.getAttribute('value'), 10);
    var newSizeValue = resizeControlsValue + RISIZE_VALUE_STEP * direction;
    if (newSizeValue >= RESIZE_MIN_VALUE && newSizeValue <= RESIZE_MAX_VALUE) {
      resizeControlsLabel.setAttribute('value', newSizeValue + '%');
      window.initializeScale(uploadImageScale, newSizeValue);
    }
  };

  buttonResizeInc.addEventListener('click', function () {
    changeSizePhoto(1);
  });
  buttonResizeDec.addEventListener('click', function () {
    changeSizePhoto(-1);
  });

  // Изменяем эффект картинки
  var onClickImageEffect = function (target, element) {
    window.initializeFilters(target, uploadImageScale);
  };

  // Показываем эффект и насыщенность эффекта
  uploadEffectControls.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'input') {
      onClickImageEffect(target, uploadImageScale);
      var startPinPosition = 20;
      var startValPosition = 20;
      uploadEffectLevelPin.style.left = startPinPosition + '%';
      uploadEffectLevelVal.style.width = startValPosition + '%';
      // Значение эффектов по умолчанию
      if (uploadImageScale.classList.contains('effect-marvin')) {
        uploadImageScale.style.filter = 'invert(20%)';
      } else if (uploadImageScale.classList.contains('effect-chrome')) {
        uploadImageScale.style.filter = 'grayscale(0.2)';
      } else if (uploadImageScale.classList.contains('effect-sepia')) {
        uploadImageScale.style.filter = 'sepia(0.2)';
      } else if (uploadImageScale.classList.contains('effect-phobos')) {
        uploadImageScale.style.filter = 'blur(0.6px)';
      } else if (uploadImageScale.classList.contains('effect-heat')) {
        uploadImageScale.style.filter = 'brightness(0.6)';
      } else {
        uploadImageScale.style.filter = 'none';
      }
      if (target.value !== 'none') {
        uploadEffectLevel.classList.remove('hidden');
      } else {
        uploadEffectLevel.classList.add('hidden');
      }
    }
  });

  // Нажатие мыши
  uploadEffectLevel.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;

    // Движение мыши
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;

      // Ограничиваем поля движения
      if (uploadEffectLevelPin.offsetLeft - shift <= MIN_TARGET_WIDTH) {
        uploadEffectLevelPin.style.left = MIN_TARGET_WIDTH + 'px';
        uploadEffectLevelVal.style.width = MIN_TARGET_WIDTH + 'px';
      } else if (uploadEffectLevelPin.offsetLeft - shift >= MAX_TARGET_WIDTH) {
        uploadEffectLevelPin.style.left = MAX_TARGET_WIDTH + 'px';
        uploadEffectLevelVal.style.width = MAX_TARGET_WIDTH + 'px';
      } else {
        uploadEffectLevelPin.style.left = (uploadEffectLevelPin.offsetLeft - shift) + 'px';
        uploadEffectLevelVal.style.width = (uploadEffectLevelPin.offsetLeft - shift) + 'px';
        // Рвссчитываем фильтры
        if (uploadImageScale.classList.contains('effect-marvin')) {
          uploadImageScale.style.filter = 'invert(' + Math.floor((uploadEffectLevelPin.offsetLeft - shift) * 100 / MAX_TARGET_WIDTH) + '%)';
        } else if (uploadImageScale.classList.contains('effect-chrome')) {
          uploadImageScale.style.filter = 'grayscale(' + (uploadEffectLevelPin.offsetLeft - shift) / MAX_TARGET_WIDTH + ')';
        } else if (uploadImageScale.classList.contains('effect-sepia')) {
          uploadImageScale.style.filter = 'sepia(' + (uploadEffectLevelPin.offsetLeft - shift) / MAX_TARGET_WIDTH + ')';
        } else if (uploadImageScale.classList.contains('effect-phobos')) {
          uploadImageScale.style.filter = 'blur(' + (uploadEffectLevelPin.offsetLeft - shift) * 3 / MAX_TARGET_WIDTH + 'px)';
        } else if (uploadImageScale.classList.contains('effect-heat')) {
          uploadImageScale.style.filter = 'brightness(' + (uploadEffectLevelPin.offsetLeft - shift) * 3 / MAX_TARGET_WIDTH + ')';
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Если форма не валидна, подсвечиваем поля
  var checkValid = function (fieldName) {
    if (!fieldName.validity.valid) {
      fieldName.style.border = '3px solid red';
    } else {
      fieldName.style.border = 'none';
    }
  };

  // Проверяем повторяющиеся теги
  var checkDoubleHashTags = function (listHashTag) {
    for (var c = 0; c < listHashTag.length; c++) {
      var hashTags = listHashTag[c];
      for (var w = c + 1; w < listHashTag.length; w++) {
        if (hashTags === listHashTag[w]) {
          uploadFormHashtags.setCustomValidity('Теги не должны повторяться');
          break;
        }
      }
    }
  };

  // Проверяем поле хеш-тегов
  var onCheckHashTags = function () {
    var maxHashTags = 5;
    var maxLengthTag = 20;
    var tagsFieldValue = uploadFormHashtags.value;
    var listHashTag = tagsFieldValue.split(' ');

    uploadFormHashtags.setCustomValidity('');

    for (var j = 0; j < listHashTag.length; j++) {
      if (listHashTag[j].charAt(0) !== '#') {
        uploadFormHashtags.setCustomValidity('Первый символ должен быть решеткой');
        break;
      } else if (listHashTag[j].indexOf('#', 2) > 0) {
        uploadFormHashtags.setCustomValidity('Хеш-теги должны разделяться пробелом');
        break;
      } else if (listHashTag[j].length > maxLengthTag) {
        uploadFormHashtags.setCustomValidity('Длина тега не должна превышать 20 символов');
        break;
      } else if (listHashTag.length > maxHashTags) {
        uploadFormHashtags.setCustomValidity('Нелья добавить более 5 хеш-тегов');
        break;
      } else if (j === listHashTag.length - 1) {
        checkDoubleHashTags(listHashTag);
      }
    }
  };

  // Проверяем поле комментария
  var onCheckComment = function () {
    if (uploadFormDescr.validity.tooShort) {
      uploadFormDescr.setCustomValidity('Текст не может быть менее 30 символов');

      if (uploadFormDescr.validity.tooLong) {
        uploadFormDescr.setCustomValidity('Текст не может быть более 100 символов');
      }
    } else {
      uploadFormDescr.setCustomValidity('');
      uploadFormDescr.style.border = 'none';
    }
  };

  uploadFormDescr.addEventListener('input', function () {
    onCheckComment();
  });

  uploadFormSubmit.addEventListener('click', function () {
    onCheckHashTags();
    checkValid(uploadFormHashtags);
    checkValid(uploadFormDescr);
  });
})();
