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

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      hideCards();
    }
  };

  var showCardByClickPin = function (pinElement, cardElement) {
    pinElement.addEventListener('click', function () {
      hideCards();
      cardElement.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    });
  };

  var closePopupCard = function (closeButton) {
    closeButton.addEventListener('click', function () {
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
  };
})();
