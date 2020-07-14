'use strict';

window.mapActive = (function () {
  var adFormElement = document.querySelector('.ad-form');
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var addressFormElement = document.querySelector('#address');
  var mapPinElements = document.querySelectorAll('.map__pin[type="button"]');

  window.form.setFieldsetAdFormDisabled();
  window.form.setSelectAdFormDisabled();
  window.form.setFieldsetFiltersDisabled();

  mapPinElements.forEach(function (item, index) {
    item.addEventListener('focus', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        window.popup.mapCardElements[index].classList.remove('hidden');
      }
    });
  });

  var setCoords = function (elem, position) {
    var box = elem.getBoundingClientRect();
    var boxTop = (position === 'center') ? (box.top + (box.width / 2) + pageYOffset) : (box.top + box.width + pageYOffset);
    var boxLeft = box.left - (box.height / 2) + pageXOffset;

    addressFormElement.value = Math.round(boxTop) + ', ' + Math.round(boxLeft);
  };

  setCoords(mapPinMainElement, 'center');

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      setActiveState();
      setCoords(mapPinMainElement, 'bottom');
    }
  });

  var setActiveState = function () {
    mapElement.classList.remove('map--faded');

    adFormElement.classList.remove('ad-form--disabled');

    // Вывод объявлений здесь нужно делать?  Если делаю в файле main.js (как было раньше), то  объявления выводятся  при неактивной  карте  и получается, что  функция hidePins выполняется  раньше, чем добавляются  объявления в html? И если так, то функции hidePins и showPins теперь  не нужны?
    window.backend.load(window.pin.pinsHandler, window.generalFunctions.errorHandler);

    window.form.fieldsetAdFormElements.forEach(function (fieldset) {
      fieldset.disabled = false;
    });

    window.form.selectFiltersFormElements.forEach(function (select) {
      select.disabled = false;
    });

    window.form.fieldsetFiltersFormElement.disabled = false;
  };

  return {
    setActiveState: setActiveState,
    setCoords: setCoords
  };
})();
