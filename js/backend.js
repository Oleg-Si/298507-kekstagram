'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/kekstagram';

  var download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        // Если отправлять не картинку сервер вернет 404, убедитесь что вы отправляете картинку!
        onError('Ошибка, код: ' + xhr.status + ' Неверный тип файла. Разрешена отправка только изображений');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 30000;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = download(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = download(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();
