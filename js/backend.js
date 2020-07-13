'use strict';

window.backend = (function () {
  var StatusCode = {
    OK: 200
  };

  var prepareRequest = function (onLoad, onError, selector, positionMessage) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText, selector, positionMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', selector, positionMessage);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', selector, positionMessage);
    });

    xhr.timeout = window.constants.TIMEOUT_IN_MS;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = prepareRequest(onLoad, onError, '.map__filters-container', 'beforebegin');

    xhr.open('GET', window.constants.API_URL + '/data');

    xhr.send();
  };

  return {
    load: load
  };
})();
