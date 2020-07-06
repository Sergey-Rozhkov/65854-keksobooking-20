'use strict';

window.card = (function () {
  var adverts = window.data.collectAdverts();
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

    return card;
  };

  var mapFilterElement = document.querySelector('.map__filters-container');

  var renderCards = function () {
    var fragmentCard = document.createDocumentFragment();

    for (var x = 0; x < window.constants.ADVERT_AMOUNTS; x++) {
      fragmentCard.appendChild(renderCard(adverts[x]));
    }

    return mapElement.insertBefore(fragmentCard, mapFilterElement);
  };

  return {
    renderCards: renderCards
  }
})();
