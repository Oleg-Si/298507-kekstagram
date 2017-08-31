'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var RESIZE_MAX_VALUE = 100;
  var RESIZE_MIN_VALUE = 25;
  var RISIZE_VALUE_STEP = 25;

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadImage = uploadForm.querySelector('.upload-image');
  var uploadFin = uploadForm.querySelector('.upload-form-cancel');
  var resizeControlsLabel = uploadForm.querySelector('.upload-resize-controls-value');
  var buttonResizeInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var buttonResizeDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
  var uploadImageScale = uploadForm.querySelector('.effect-image-preview');
  var uploadEffectControls = uploadForm.querySelector('.upload-effect-controls');
  var uploadFormHashtags = uploadForm.querySelector('.upload-form-hashtags');
  var uploadFormSubmit = uploadForm.querySelector('.upload-form-submit');
  var uploadFormDescr = uploadForm.querySelector('.upload-form-description');
  uploadFormDescr.setAttribute('tabindex', 0);

  // Обработчик нажатия кнопки Esc на окне загрузки
  var onUploadEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (document.activeElement !== uploadFormDescr) {
        onClickUploadFin();
      }
    }
  };

  var onChangeUploadForm = function () {
    uploadOverlay.classList.remove('hidden');
    uploadImage.classList.add('hidden');
    document.addEventListener('keydown', onUploadEscPress);
  };

  var onClickUploadFin = function () {
    uploadOverlay.classList.add('hidden');
    uploadImage.classList.remove('hidden');
    document.removeEventListener('keydown', onUploadEscPress);
  };

  uploadFile.addEventListener('change', onChangeUploadForm);

  uploadFin.addEventListener('click', onClickUploadFin);
  uploadFin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onClickUploadFin();
    }
  });

  // Изменяем размер фото
  var changeResizeValue = function (direction) {
    var resizeControlsValue = parseInt(resizeControlsLabel.getAttribute('value'), 10);
    var newResizeValue = resizeControlsValue + RISIZE_VALUE_STEP * direction;
    if (newResizeValue >= RESIZE_MIN_VALUE && newResizeValue <= RESIZE_MAX_VALUE) {
      resizeControlsLabel.setAttribute('value', newResizeValue + '%');
      uploadImageScale.style.transform = 'scale(' + newResizeValue / 100 + ')';
    }
  };

  buttonResizeInc.addEventListener('click', function () {
    changeResizeValue(1);
  });
  buttonResizeDec.addEventListener('click', function () {
    changeResizeValue(-1);
  });

  // Изменяем эффект картинки
  var currentEffect = null;
  var onClickImageEffect = function (target) {
    var effectName = target.value;
    uploadImageScale.classList.remove(currentEffect);
    currentEffect = 'effect-' + effectName;
    uploadImageScale.classList.add(currentEffect);
  };

  uploadEffectControls.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'input') {
      onClickImageEffect(target);
    }
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
