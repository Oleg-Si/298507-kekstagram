'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');

  window.preview = {
    // Получаем данные для наполнения галереи
    getGalleryContent: function (evt) {
      var galleryContent = {
        url: evt.currentTarget.children[0].getAttribute('src'),
        likes: evt.currentTarget.querySelector('.picture-likes').textContent,
        comments: evt.currentTarget.querySelector('.picture-comments').textContent
      };
      return galleryContent;
    },

    // Наполняем галерею данными
    showGalleryContent: function (usedContent) {
      galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', usedContent.url);
      galleryOverlay.querySelector('.likes-count').textContent = usedContent.likes;
      galleryOverlay.querySelector('.comments-count').textContent = usedContent.comments;
    }
  };
})();
