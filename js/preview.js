'use strict';

(function () {
  window.preview = {
    // Получаем данные для наполнения галереи
    getGalleryContent: function (evt) {
      var galleryContent = {
        url: evt.currentTarget.children[0].getAttribute('src'),
        // Поиск на объекте evt!!!
        likes: evt.currentTarget.querySelector('.picture-likes').textContent,
        comments: evt.currentTarget.querySelector('.picture-comments').textContent
      };
      return galleryContent;
    },

    // Наполняем галерею данными
    showGalleryContent: function (usedContent) {
      window.gallery.overlay.querySelector('.gallery-overlay-image').setAttribute('src', usedContent.url);
      window.gallery.overlay.querySelector('.likes-count').textContent = usedContent.likes;
      window.gallery.overlay.querySelector('.comments-count').textContent = usedContent.comments;
    }
  };
})();
