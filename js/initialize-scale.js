'use strict';

(function () {
  window.initializeScale = function (uploadImageScale, newResizeValue) {
    uploadImageScale.style.transform = 'scale(' + newResizeValue / 100 + ')';
  };
})();
