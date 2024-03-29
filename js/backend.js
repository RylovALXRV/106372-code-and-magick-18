'use strict';

(function () {

  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;

  var Request = {
    'get': {
      METHOD: 'GET',
      URL: 'https://js.dump.academy/code-and-magick/data'
    },
    'post': {
      METHOD: 'POST',
      URL: 'https://js.dump.academy/code-and-magick'
    }
  };

  var dataLoadHandler = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = dataLoadHandler(onLoad, onError);

    xhr.open(Request['get'].METHOD, Request['get'].URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = dataLoadHandler(onLoad, onError);

    xhr.open(Request['post'].METHOD, Request['post'].URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
