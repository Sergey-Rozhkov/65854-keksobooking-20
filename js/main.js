'use strict';

var ADVERT_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8'];
var ADVERT_PRICES = ['300', '400', '500', '600', '700', '800', '900', '1000'];
var ADVERT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADVERT_CHECKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];
var ADVERT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADVERT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADVERT_AMOUNTS = 8;

var getRandomNumberFromRange = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomItemArray = function (arr) {
  var index = getRandomNumberFromRange(0, arr.length - 1);
  var result = arr[index];
  arr.splice(index, 1);

  return result;
};

var getArrayRandomLength = function (arr) {
  var newArray = arr.slice(getRandomNumberFromRange(-(arr.length - 1), arr.length - 1));

  return newArray;
};

var adverts = [];

for (var i = 0; i < ADVERT_AMOUNTS; i++) {
  var number = getRandomItemArray(ADVERT_NUMBERS);
  var advertLocationX = getRandomNumberFromRange(0, 1160);
  var advertLocationY = getRandomNumberFromRange(130, 630);
  var advertRooms = getRandomNumberFromRange(1, 10);

  var advert = {
    author: {
      avatar: 'img/avatars/user0' + number + '.png',
    },
    offer: {
      title: 'Заголовок предложения ' + number,
      address: advertLocationX + ', ' + advertLocationY,
      price: ADVERT_PRICES[getRandomNumberFromRange(0, ADVERT_PRICES.length - 1)],
      type: ADVERT_TYPES[getRandomNumberFromRange(0, ADVERT_TYPES.length - 1)],
      rooms: advertRooms,
      guests: advertRooms * 2,
      checkin: ADVERT_CHECKINS_CHECKOUTS[getRandomNumberFromRange(0, ADVERT_CHECKINS_CHECKOUTS.length - 1)],
      checkout: ADVERT_CHECKINS_CHECKOUTS[getRandomNumberFromRange(0, ADVERT_CHECKINS_CHECKOUTS.length - 1)],
      features: getArrayRandomLength(ADVERT_FEATURES),
      description: 'Описание сдающегося объекта ' + number,
      photos: getArrayRandomLength(ADVERT_PHOTOS),
    },
    location: {
      x: advertLocationX + 'px',
      y: advertLocationY + 'px',
    }
  };

  adverts.push(advert);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

var fragment = document.createDocumentFragment();
for (var j = 0; j < ADVERT_AMOUNTS; j++) {
  fragment.appendChild(renderPin(adverts[j]));
}

mapPinsElement.appendChild(fragment);

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

var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(renderCard(adverts[0]));

map.insertBefore(fragmentCard, mapFilterElement);
