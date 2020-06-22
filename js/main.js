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

// Карточка

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

  // Наверное что-то   неправильно, не вижу, чтобы  выводился 'wifi' и часто  выводится  один 'conditioner'
  for (var x = 0; x < point.offer.features.length; x++) {
    var cardFeature = card.querySelector('.popup__feature');
    if (point.offer.features[i] !== 'wifi' && cardFeature.classList.contains('popup__feature--wifi')) {
      cardFeature.remove();
    } else if (point.offer.features[i] !== 'dishwasher' && cardFeature.classList.contains('popup__feature--dishwasher')) {
      cardFeature.remove();
    } else if (point.offer.features[i] !== 'parking' && cardFeature.classList.contains('popup__feature--parking')) {
      cardFeature.remove();
    } else if (point.offer.features[i] !== 'washer' && cardFeature.classList.contains('popup__feature--washer')) {
      cardFeature.remove();
    } else if (point.offer.features[i] !== 'elevator' && cardFeature.classList.contains('popup__feature--elevator')) {
      cardFeature.remove();
    } else if (point.offer.features[i] !== 'conditioner' && cardFeature.classList.contains('popup__feature--conditioner')) {
      cardFeature.remove();
    }
  }

  card.querySelector('.popup__description').textContent = point.offer.description;

  var cardPhotos = card.querySelector('.popup__photos');

  var getPhotoSrc = function (elementSrc) {
    var cardImg = cardTemplateElement.querySelector('.popup__photo').cloneNode(true);

    cardImg.setAttribute('src', elementSrc);

    return cardImg;
  };

  for (var y = 0; y < point.offer.photos.length; y++) {
    cardPhotos.appendChild(getPhotoSrc(point.offer.photos[y]));
  }

  // Не знаю как по-другому удалить  тег  img, который первоначально есть  в разметке. Иначе у меня выводится  и он (с пустым  src) и новые img
  cardPhotos.children[0].remove();

  card.querySelector('.popup__avatar').setAttribute('src', point.author.avatar);

  return card;
};

var mapFiltersContainer = document.querySelector('.map__filters-container');

// Не получается  вставить   карточку  через insertAdjacentHTML, вставляется   [object HTMLElement], а не html:
// var newElement = renderCard(adverts[0]);
// mapFiltersContainer.insertAdjacentHTML('beforebegin', newElement);

// а если сохранить  html строкой  в переменной и вставить   на страницу,  то  все нормально:
// var test = '<div>hello</div>';
// mapFiltersContainer.insertAdjacentHTML('beforebegin', test);

// Получилось вывести  карточку  перед .map__filters-container только  через insertBefore, либо через appendChild, но в конец .map (то  есть  уже после .map__filters-container)

// И как правильно, сначала добавить  карточку  в fragment, а потом  на страницу  или если она одна, то  сразу на страницу?
var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(renderCard(adverts[0]));

map.insertBefore(fragmentCard, mapFiltersContainer);

// map.appendChild(fragmentCard);
