'use strict';

(function () {
  var RENDER_TIME = 500;

  var lastTime;
  window.debounce = function (fun) {
    if (lastTime) {
      window.clearTimeout(lastTime);
    }
    lastTime = window.setTimeout(fun, RENDER_TIME);
  };
})();
