'use strict';

(function () {
  // Вставляем фрагмент
  window.picture = {
    insertFragment: function () {
      var pictures = document.querySelector('.pictures');
      pictures.appendChild(window.data.getFragment());
    }
  };
})();
