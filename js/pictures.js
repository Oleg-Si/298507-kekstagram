'use strict';

var RESIZE_MAX_VALUE = 100;
var RESIZE_MIN_VALUE = 25;
var RISIZE_VALUE_STEP = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var template = document.querySelector('#picture-template').content.querySelector('.picture');

// Находим рандомное число в диапазоне
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Генерируем массив комментариев
var getCommentsNumbers = function () {
  var commentsNumbers = [];
  var commentsCount = getRandomInt(1, 3);
  for (var i = 1; i <= commentsCount; i++) {
    commentsNumbers[i - 1] = COMMENTS_LIST[getRandomInt(0, 6)];
  }
  return commentsNumbers;
};

// Генерируем массив
var generateArray = function () {
  var result = [];
  for (var i = 0; i < 25; i++) {
    var myKekstagramItem = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(15, 201),
      comments: getCommentsNumbers().length
    };
    result.push(myKekstagramItem);
  }
  return result;
};

var myKekstagram = generateArray();

// Наполняем фрагмент елементами
var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 25; i++) {
    template.setAttribute('tabindex', 0);
    template.children[0].setAttribute('src', myKekstagram[i].url);
    template.querySelector('.picture-likes').textContent = myKekstagram[i].likes;
    template.querySelector('.picture-comments').textContent = myKekstagram[i].comments;
    var element = template.cloneNode(true);
    fragment.appendChild(element);
  }
  return fragment;
};

var fragment = getFragment();

// Вставляем фрагмент
var insertFragment = function () {
  var pictures = document.querySelector('.pictures');
  pictures.appendChild(fragment);
};

insertFragment();

var galleryOverlay = document.querySelector('.gallery-overlay');

var pictureOpen = document.querySelectorAll('.picture');
var pictureClosed = document.querySelector('.gallery-overlay-close');
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

// Получаем данные для наполнения галереи
var getGalleryContent = function (evt) {
  var galleryContent = {
    url: evt.currentTarget.children[0].getAttribute('src'),
    likes: evt.currentTarget.querySelector('.picture-likes').textContent,
    comments: evt.currentTarget.querySelector('.picture-comments').textContent
  };
  return galleryContent;
};

// Наполняем галерею данными
var showGalleryContent = function (usedContent) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', usedContent.url);
  galleryOverlay.querySelector('.likes-count').textContent = usedContent.likes;
  galleryOverlay.querySelector('.comments-count').textContent = usedContent.comments;
};

// Добавляем обработчики клика мыши и кнопки
for (var i = 0; i < 25; i++) {
  pictureOpen[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    var usedContent = getGalleryContent(evt);
    showGalleryContent(usedContent);
    showGallery();
  });
  pictureOpen[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      var usedContent = getGalleryContent(evt);
      showGalleryContent(usedContent);
      showGallery();
    }
  });
}

// Добавляем обработчик клика мыши
pictureClosed.addEventListener('click', hideGallery);

// Добавляем обработчик клика кнопки
pictureClosed.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideGallery();
  }
});

var uploadForm = document.querySelector('#upload-select-image');
var uploadFile = uploadForm.querySelector('#upload-file');
var uploadOverlay = uploadForm.querySelector('.upload-overlay');
var uploadImage = uploadForm.querySelector('.upload-image');
var uploadFin = uploadForm.querySelector('.upload-form-cancel');
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

var resizeControlsLabel = uploadForm.querySelector('.upload-resize-controls-value');
var buttonResizeInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
var buttonResizeDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
var uploadImageScale = uploadForm.querySelector('.effect-image-preview');
var uploadEffectControls = uploadForm.querySelector('.upload-effect-controls');
var uploadFormHashtags = uploadForm.querySelector('.upload-form-hashtags');

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

var currentEffect;
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

// Проверяем повторяющиеся теги
var onCheckForTheSameWord = function (listTags, index) {
  var lengthListTags = listTags.length;
  for (var j = 1; j < lengthListTags; j++) {
    if (listTags[j] === listTags[index] && j !== index) {
      uploadFormHashtags.setCustomValidity('Теги не должны повторяться');
      break;
    }
  }
};

// Проверяем поле хеш-тегов
var onCheckHashTags = function () {
  var maxHashTags = 5;
  var maxLengthTag = 21;
  var tagsFieldValue = uploadFormHashtags.value;
  var listHashTag = tagsFieldValue.match(/\#[a-zA-Zа-яА-Я0-9\-]+/g);

  uploadFormHashtags.setCustomValidity('');

  if (tagsFieldValue.length === 0) {
    return;
  }

  if (listHashTag === null) {
    uploadFormHashtags.setCustomValidity('Первый символ должен быть решеткой');
  } else {
    var lengthListHashTags = listHashTag.length;
    if (lengthListHashTags > maxHashTags) {
      uploadFormHashtags.setCustomValidity('Нелья добавить более 5 хеш-тегов');
    }

    for (var l = 0; l < lengthListHashTags; l++) {
      if (listHashTag[l].length > maxLengthTag) {
        uploadFormHashtags.setCustomValidity('Длина тега не должна превышать 20 символов');
        break;
      }
      if (lengthListHashTags > 1) {
        onCheckForTheSameWord(listHashTag, l);
      }
    }
  }
};

uploadFormHashtags.addEventListener('input', function () {
  onCheckHashTags();
});
