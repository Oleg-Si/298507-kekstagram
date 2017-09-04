'use strict';

(function () {
  window.initializeScale = function (direction, resizeControlsLabel, uploadImageScale, RESIZE_MAX_VALUE, RESIZE_MIN_VALUE, RISIZE_VALUE_STEP) {
    var resizeControlsValue = parseInt(resizeControlsLabel.getAttribute('value'), 10);
    var newResizeValue = resizeControlsValue + RISIZE_VALUE_STEP * direction;
    if (newResizeValue >= RESIZE_MIN_VALUE && newResizeValue <= RESIZE_MAX_VALUE) {
      resizeControlsLabel.setAttribute('value', newResizeValue + '%');
      uploadImageScale.style.transform = 'scale(' + newResizeValue / 100 + ')';
    }
  };
})();
