'use strict';

(function () {
  var currentEffect = null;
  window.initializeFilters = function (target, uploadImageScale) {
    var effectName = target.value;
    uploadImageScale.classList.remove(currentEffect);
    currentEffect = 'effect-' + effectName;
    uploadImageScale.classList.add(currentEffect);
  };
})();
