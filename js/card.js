'use strict';

window.card = (function () {
  var mapElement = document.querySelector('.map');

  var cardTemplateElement = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderCard = function (point) {
    var card = cardTemplateElement.cloneNode(true);

    card.querySelector('.popup__title').textContent = point.offer.title;
    card.querySelector('.popup__text--address').textContent = point.offer.address;
    card.querySelector('.popup__text--price').textContent = point.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = point.offer.type;
    card.querySelector('.popup__text--capacity').textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + point.offer.checkin + ', выезд до ' + point.offer.checkout + '.';

    card.querySelectorAll('.popup__feature').forEach(function (element) {
      element.classList.add('hidden');
    });

    point.offer.features.forEach(function (feature) {
      card.querySelector('.popup__feature--' + feature).classList.remove('hidden');
    });

    card.querySelector('.popup__description').textContent = point.offer.description;

    var cardPhotosElement = card.querySelector('.popup__photos');

    var getCardImg = function (src) {
      var cardImgElement = cardTemplateElement.querySelector('.popup__photo').cloneNode(true);

      cardImgElement.setAttribute('src', src);

      return cardImgElement;
    };

    point.offer.photos.forEach(function (photo) {
      cardPhotosElement.appendChild(getCardImg(photo));
    });

    cardPhotosElement.children[0].remove();

    card.querySelector('.popup__avatar').setAttribute('src', point.author.avatar);
    card.classList.add('hidden');

    return card;
  };

  var mapFilterElement = document.querySelector('.map__filters-container');

  var renderCards = function (list) {
    var fragment = document.createDocumentFragment();
    var quantityCards = list.length > window.constants.MAX_PINS_COUNT ? window.constants.MAX_PINS_COUNT : list.length;
    var mapCardElements = document.querySelectorAll('.map__card');

    mapCardElements.forEach(function (item) {
      item.remove();
    });

    for (var j = 0; j < quantityCards; j++) {
      fragment.appendChild(renderCard(list[j]));
    }

    return mapElement.insertBefore(fragment, mapFilterElement);
  };

  return {
    renderCards: renderCards
  };
})();
