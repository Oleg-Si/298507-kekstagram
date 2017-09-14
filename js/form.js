'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var RESIZE_MAX_VALUE = 100;
  var RESIZE_MIN_VALUE = 25;
  var RISIZE_VALUE_STEP = 25;
  var MAX_TARGET_WIDTH = 455;
  var MIN_TARGET_WIDTH = 0;
  var MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAGS = 20;
  var START_PIN_POSITION = 20;
  var START_VAL_POSITION = 20;

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadImage = uploadForm.querySelector('.upload-image');
  var uploadCancel = uploadForm.querySelector('.upload-form-cancel');
  var resizeControlsLabel = uploadForm.querySelector('.upload-resize-controls-value');
  var buttonResizeInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var buttonResizeDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
  var uploadImageScale = uploadForm.querySelector('.effect-image-preview');
  var uploadEffectNone = uploadOverlay.querySelector('#upload-effect-none');
  var uploadEffectControls = uploadForm.querySelector('.upload-effect-controls');
  var uploadFormHashtags = uploadForm.querySelector('.upload-form-hashtags');
  var uploadFormSubmit = uploadForm.querySelector('.upload-form-submit');
  var uploadEffectLevel = uploadEffectControls.querySelector('.upload-effect-level');
  var uploadEffectLine = uploadEffectLevel.querySelector('.upload-effect-level-line');
  var uploadEffectLevelPin = uploadEffectLevel.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelVal = uploadEffectLevel.querySelector('.upload-effect-level-val');
  var uploadFormDescr = uploadForm.querySelector('.upload-form-description');
  uploadFormDescr.setAttribute('tabindex', 0);

  // Скрываем поле эффектов
  uploadEffectLevel.classList.add('hidden');

  // Обработчик нажатия кнопки Esc на окне загрузки
  var onEscPressUploadForm = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (document.activeElement !== uploadFormDescr) {
        onClickUploadCancel();
      }
    }
  };

  var onChangeUploadForm = function () {
    uploadOverlay.classList.remove('hidden');
    uploadImage.classList.add('hidden');
    document.addEventListener('keydown', onEscPressUploadForm);
  };

  var onClickUploadCancel = function () {
    uploadOverlay.classList.add('hidden');
    window.form.reset();
    uploadImage.classList.remove('hidden');
    document.removeEventListener('keydown', onEscPressUploadForm);
  };

  uploadFile.addEventListener('change', onChangeUploadForm);

  uploadCancel.addEventListener('click', onClickUploadCancel);
  uploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onClickUploadCancel();
    }
  });

  // Изменяем размер фото
  var onClickbuttonResize = function (direction) {
    var resizeControlsValue = parseInt(resizeControlsLabel.getAttribute('value'), 10);
    var newSizeValue = resizeControlsValue + RISIZE_VALUE_STEP * direction;
    if (newSizeValue >= RESIZE_MIN_VALUE && newSizeValue <= RESIZE_MAX_VALUE) {
      resizeControlsLabel.setAttribute('value', newSizeValue + '%');
      window.initializeScale(uploadImageScale, newSizeValue);
    }
  };

  buttonResizeInc.addEventListener('click', function () {
    onClickbuttonResize(1);
  });
  buttonResizeDec.addEventListener('click', function () {
    onClickbuttonResize(-1);
  });

  // Показываем эффект и насыщенность эффекта
  uploadEffectControls.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'input') {
      window.initializeFilters(target, uploadImageScale);
      uploadEffectLevelPin.style.left = START_PIN_POSITION + '%';
      uploadEffectLevelVal.style.width = START_VAL_POSITION + '%';
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
      var uploadEffectLinePosition = uploadEffectLine.getBoundingClientRect();
      if (moveEvt.clientX <= uploadEffectLinePosition.right && moveEvt.clientX >= uploadEffectLinePosition.left) {
        var shift = startCoords - moveEvt.clientX;
        startCoords = moveEvt.clientX;
        // Для синхронизации значений полосы и пина
        var totalCoordinats = (uploadEffectLevelPin.offsetLeft - shift) + 'px';
        uploadEffectLevelPin.style.left = totalCoordinats;
        uploadEffectLevelVal.style.width = totalCoordinats;
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
      // Ограничиваем поля движения
      if (uploadEffectLevelPin.offsetLeft - shift <= MIN_TARGET_WIDTH) {
        uploadEffectLevelPin.style.left = MIN_TARGET_WIDTH + 'px';
        uploadEffectLevelVal.style.width = MIN_TARGET_WIDTH + 'px';
      } else if (uploadEffectLevelPin.offsetLeft - shift >= MAX_TARGET_WIDTH) {
        uploadEffectLevelPin.style.left = MAX_TARGET_WIDTH + 'px';
        uploadEffectLevelVal.style.width = MAX_TARGET_WIDTH + 'px';
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
  var onCheckValid = function (fieldName) {
    if (!fieldName.validity.valid) {
      fieldName.style.border = '3px solid red';
    } else {
      fieldName.style.border = 'none';
    }
  };

  // Проверяем повторяющиеся теги
  var checkDoubleHashTags = function (hashtags) {
    for (var l = 0; l < hashtags.length; l++) {
      var hashtag = hashtags[l];
      for (var j = l + 1; j < hashtags.length; j++) {
        if (hashtag === hashtags[j]) {
          return 1;
        }
      }
    }
    return 0;
  };

  // Проверяем поле хеш-тегов
  var onCheckHashTags = function () {
    var tagsFieldValue = uploadFormHashtags.value.trim();
    uploadFormHashtags.value = tagsFieldValue;
    var hashtags = tagsFieldValue.split(' ');

    uploadFormHashtags.setCustomValidity('');

    if (tagsFieldValue === '') {
      // uploadFormHashtags.style.border = 'none';
      return;
    } else if (hashtags.length > MAX_HASHTAGS) {
      uploadFormHashtags.setCustomValidity('Нелья добавить более 5 хеш-тегов');
      return;
    } else if (checkDoubleHashTags(hashtags)) {
      uploadFormHashtags.setCustomValidity('Теги не должны повторяться');
      return;
    }

    for (var j = 0; j < hashtags.length; j++) {
      if (hashtags[j].charAt(0) !== '#') {
        uploadFormHashtags.setCustomValidity('Первый символ должен быть решеткой');
        break;
      } else if (hashtags[j].indexOf('#', 2) > 0) {
        uploadFormHashtags.setCustomValidity('Хеш-теги должны разделяться пробелом');
        break;
      } else if (hashtags[j].length > MAX_LENGTH_HASHTAGS) {
        uploadFormHashtags.setCustomValidity('Длина тега не должна превышать 20 символов');
        break;
      }
    }
  };

  // Проверяем поле комментария
  var onInputUploadFormDescr = function () {
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

  var onClickUploadFormSubmit = function () {
    onCheckHashTags();
    onCheckValid(uploadFormHashtags);
    onCheckValid(uploadFormDescr);
  };

  uploadFormDescr.addEventListener('input', function () {
    onInputUploadFormDescr();
  });

  uploadFormSubmit.addEventListener('click', function () {
    onClickUploadFormSubmit();
  });

  // Сбрасываем данные формы
  window.form = {
    reset: function () {
      uploadFormHashtags.value = '';
      uploadFormDescr.value = '';
      resizeControlsLabel.setAttribute('value', '100%');
      uploadImageScale.className = 'effect-image-preview';
      uploadImageScale.style.filter = 'none';
      uploadImageScale.style.transform = 'scale(1)';
      uploadEffectLevelPin.style.left = START_PIN_POSITION + '%';
      uploadEffectLevelVal.style.width = START_VAL_POSITION + '%';
      uploadEffectNone.checked = true;
      uploadEffectLevel.classList.add('hidden');
    }
  };
})();
