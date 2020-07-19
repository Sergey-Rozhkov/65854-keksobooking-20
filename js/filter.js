'use strict';

window.filter = (function () {
  var housingTypeElement = document.querySelector('#housing-type');

  var updatePins = function (housingType) {
    var sameHousingType = [];

    if (housingTypeElement.value === 'any') {
      sameHousingType = window.main.adverts;
    } else {
      sameHousingType = window.main.adverts.filter(function (advert) {
        return advert.offer.type === housingType;
      });
    }

    window.pin.renderPins(sameHousingType);
    window.card.renderCards(sameHousingType);
    window.popup.showCard();
    window.popup.popupCardClose();
  };

  housingTypeElement.addEventListener('change', function () {
    updatePins(housingTypeElement.value);
  });
})();
