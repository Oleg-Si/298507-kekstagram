'use strict';

(function () {
  var time = 500;
  var lastTime;
  window.debounce = function (fun) {
    if (lastTime) {
      window.clearTimeout(lastTime);
    }
    lastTime = window.setTimeout(fun, time);
  };
})();
