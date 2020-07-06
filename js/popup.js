'use strict';

window.popup = (function () {
  var mapCardElements = document.querySelectorAll('.map__card');
  var mapPinElements = document.querySelectorAll('.map__pin[type="button"]');
  var popupCloseElements = document.querySelectorAll('.popup__close');

  var hideCard = function () {
    mapCardElements.forEach(function (item) {
      if (!item.classList.contains('hidden')) {
        item.classList.add('hidden');
      }
    });
  };

  hideCard();

  var setCardByClickPin = function (pinElement, cardElement) {
    pinElement.addEventListener('click', function () {
      hideCard();
      cardElement.classList.remove('hidden');
    });
  };

  mapPinElements.forEach(function (item, index) {
    setCardByClickPin(item, mapCardElements[index]);
  });

  var closePopupCard = function (button) {
    button.addEventListener('click', function () {
      button.closest('.map__card').classList.add('hidden');
    });

    document.removeEventListener('keydown', window.generalFunctions.onPopupEscPress);
  };

  popupCloseElements.forEach(function (item) {
    closePopupCard(item);
  });

  return {
    hideCard: hideCard
  };
})();
