'use strict';

window.mapActive = (function () {
  var adFormElement = document.querySelector('.ad-form');
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapPinElements = document.querySelectorAll('.map__pin[type="button"]');

  mapPinElements.forEach(function (item, index) {
    item.addEventListener('focus', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        window.popup.mapCardElements[index].classList.remove('hidden');
      }
    });
  });

  var hidePins = function () {
    mapPinElements = document.querySelectorAll('.map__pin[type="button"]');

    mapPinElements.forEach(function (item) {
      item.classList.add('hidden');
    });
  };

  var showPins = function (pins) {
    pins.forEach(function (item) {
      item.classList.remove('hidden');
    });
  };

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      setActiveState();
      window.form.setCoords(mapPinMainElement, 'bottom');
    }
  });

  var setDefaultPinPosition = function () {
    mapPinMainElement.style.top = window.constants.MAP_PIN_DEFAULT_TOP;
    mapPinMainElement.style.left = window.constants.MAP_PIN_DEFAULT_LEFT;
  };

  var setInactiveState = function () {
    window.form.setFieldsetAdFormDisabled(true);
    window.form.setSelectAdFormDisabled(true);
    window.form.setFieldsetFiltersDisabled(true);

    window.form.submitFormElement.disabled = true;
    window.form.resetFormElement.disabled = true;

    hidePins();
    setDefaultPinPosition();
    window.form.setCoords(mapPinMainElement, 'center');

    if (!mapElement.classList.contains('map--faded')) {
      mapElement.classList.add('map--faded');
    }

    if (!adFormElement.classList.contains('ad-form--disabled')) {
      adFormElement.classList.add('ad-form--disabled');
    }
  };

  setInactiveState();

  var fillUpPinsAndCards = function () {
    window.backend.load(window.main.fillUpAdverts, window.generalFunctions.errorHandler, false);
  };

  fillUpPinsAndCards();

  var setActiveState = function () {
    window.form.setFieldsetAdFormDisabled(false);
    window.form.setSelectAdFormDisabled(false);
    window.form.setFieldsetFiltersDisabled(false);

    window.form.submitFormElement.disabled = false;
    window.form.resetFormElement.disabled = false;

    window.pin.renderPins(window.main.adverts);
    window.card.renderCards(window.main.adverts);
    window.popup.showCard();
    window.popup.popupCardClose();
    window.form.setCoords(mapPinMainElement, 'bottom');

    mapPinElements = document.querySelectorAll('.map__pin[type="button"]');

    mapElement.classList.remove('map--faded');

    adFormElement.classList.remove('ad-form--disabled');
  };

  return {
    hidePins: hidePins,
    showPins: showPins,
    setActiveState: setActiveState,
    mapPinMainElement: mapPinMainElement,
    setInactiveState: setInactiveState,
    setDefaultPinPosition: setDefaultPinPosition
  };
})();
