'use strict';

window.backend = (function () {
  var StatusCode = {
    OK: 200
  };

  var prepareRequest = function (onLoad, onError, selector, positionMessage, isForm) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
        if (isForm) {
          window.notices.showSuccessPopup();
        }
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

  var save = function (data, onLoad, onError, isForm) {
    var xhr = prepareRequest(onLoad, onError, '.ad-form', 'beforeend', isForm);

    xhr.open('POST', window.constants.API_URL);

    xhr.send(data);
  };

  var load = function (onLoad, onError, isForm) {
    var xhr = prepareRequest(onLoad, onError, '.map__filters-container', 'beforebegin', isForm);

    xhr.open('GET', window.constants.API_URL + '/data');

    xhr.send();
  };

  return {
    save: save,
    load: load
  };
})();
