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
    pin.classList.add('hidden');

    return pin;
  };

  var pinsHandler = function (list) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < window.constants.MAX_PINS_COUNT; j++) {
      fragment.appendChild(renderPin(list[j]));
    }

    return mapPinsElement.appendChild(fragment);
  };

  return {
    pinsHandler: pinsHandler
  };
})();
