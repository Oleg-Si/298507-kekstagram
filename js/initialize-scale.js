'use strict';

(function () {
  var RESIZE_MAX_VALUE = 100;
  var RESIZE_MIN_VALUE = 25;
  var RISIZE_VALUE_STEP = 25;
  window.initializeScale = {
    scale: function (direction, resizeControlsLabel, uploadImageScale) {
      var resizeControlsValue = parseInt(resizeControlsLabel.getAttribute('value'), 10);
      var newResizeValue = resizeControlsValue + RISIZE_VALUE_STEP * direction;
      if (newResizeValue >= RESIZE_MIN_VALUE && newResizeValue <= RESIZE_MAX_VALUE) {
        resizeControlsLabel.setAttribute('value', newResizeValue + '%');
        uploadImageScale.style.transform = 'scale(' + newResizeValue / 100 + ')';
      }
    }
  };
})();
