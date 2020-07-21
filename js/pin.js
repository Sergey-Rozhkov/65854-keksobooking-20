'use strict';

window.pin = (function () {
  var mapPinsElement = document.querySelector('.map__pins');

  var pinTemplateElement = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderPin = function (item) {
    var pin = pinTemplateElement.cloneNode(true);
    var imgElement = pin.querySelector('img');

    imgElement.setAttribute('src', item.author.avatar);
    imgElement.setAttribute('alt', item.offer.title);
    pin.style.left = item.location.x + 'px';
    pin.style.top = item.location.y + 'px';

    return pin;
  };

  var renderPins = function (list) {
    var fragment = document.createDocumentFragment();
    var quantityPins = list.length > window.constants.MAX_PINS_COUNT ? window.constants.MAX_PINS_COUNT : list.length;
    var mapPinElements = document.querySelectorAll('.map__pin[type="button"]');

    mapPinElements.forEach(function (item) {
      item.remove();
    });

    for (var j = 0; j < quantityPins; j++) {
      fragment.appendChild(renderPin(list[j]));
    }

    return mapPinsElement.appendChild(fragment);
  };

  return {
    renderPins: renderPins
  };
})();
