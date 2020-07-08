'use strict';

window.pin = (function () {
  var adverts = window.data.collectAdverts();

  var mapPinsElement = document.querySelector('.map__pins');

  var pinTemplateElement = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderPin = function (item) {
    var pin = pinTemplateElement.cloneNode(true);
    var imgElement = pin.querySelector('img');

    imgElement.setAttribute('src', item.author.avatar);
    imgElement.setAttribute('alt', item.offer.title);
    pin.style.left = item.location.x;
    pin.style.top = item.location.y;

    return pin;
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.constants.ADVERT_AMOUNTS; j++) {
      fragment.appendChild(renderPin(adverts[j]));
    }

    return mapPinsElement.appendChild(fragment);
  };

  return {
    renderPins: renderPins
  };
})();
