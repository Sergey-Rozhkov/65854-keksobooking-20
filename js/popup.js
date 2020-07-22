'use strict';

window.popup = (function () {

  var hideCards = function () {
    var mapCardElements = document.querySelectorAll('.map__card');

    mapCardElements.forEach(function (item) {
      if (!item.classList.contains('hidden')) {
        item.classList.add('hidden');

        document.removeEventListener('keydown', onPopupEscPress);
      }
    });
  };

  var deleteActivePinClass = function () {
    var mapPinElements = document.querySelectorAll('.map__pin[type="button"]');

    mapPinElements.forEach(function (item) {
      if (item.classList.contains('map__pin--active')) {
        item.classList.remove('map__pin--active');
      }
    });
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      hideCards();
      deleteActivePinClass();
    }
  };

  var showCardByClickPin = function (pinElement, cardElement) {
    pinElement.addEventListener('click', function () {
      hideCards();
      deleteActivePinClass();

      cardElement.classList.remove('hidden');
      pinElement.classList.add('map__pin--active');

      document.addEventListener('keydown', onPopupEscPress);
    });
  };

  var closePopupCard = function (closeButton) {
    closeButton.addEventListener('click', function () {
      deleteActivePinClass();

      closeButton.closest('.map__card').classList.add('hidden');
    });
  };

  var popupCardClose = function () {
    var popupCloseElements = document.querySelectorAll('.popup__close');

    popupCloseElements.forEach(function (item) {
      closePopupCard(item);
    });
  };

  var showCard = function () {
    var mapCardElements = document.querySelectorAll('.map__card');
    var mapPinElements = document.querySelectorAll('.map__pin[type="button"]');

    mapPinElements.forEach(function (item, index) {
      showCardByClickPin(item, mapCardElements[index]);
    });
  };

  return {
    popupCardClose: popupCardClose,
    showCard: showCard,
    hideCards: hideCards
  };
})();
