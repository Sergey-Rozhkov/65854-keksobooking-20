'use strict';

window.mainPinHandle = (function () {
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (((mapPinMainElement.offsetTop - shift.y) <= window.constants.LOCATION_Y_MIN) || ((mapPinMainElement.offsetTop - shift.y) >= window.constants.LOCATION_Y_MAX)) {
        mapPinMainElement.style.top = mapPinMainElement.offsetTop + 'px';
      } else {
        mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
      }

      if (((mapPinMainElement.offsetLeft - shift.x) <= window.constants.LOCATION_X_MIN) || ((mapPinMainElement.offsetLeft - shift.x) >= window.constants.LOCATION_X_MAX)) {
        mapPinMainElement.style.left = mapPinMainElement.offsetLeft + 'px';
      } else {
        mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';
      }

      window.form.setCoords(mapPinMainElement, 'bottom');
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (evt.button === 0) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      if (mapElement.classList.contains('map--faded')) {
        window.mapActive.setActiveState();
      }
    }
  });
})();
