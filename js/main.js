'use strict';

var ADVERT_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8'];
var ADVERT_PRICE = ['300', '400', '500', '600', '700', '800', '900', '1000'];
var ADVERT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ADVERT_CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
var ADVERT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADVERT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomNumberFromRange = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomItemArray = function (arr) {
  var index = getRandomNumberFromRange(0, arr.length - 1);
  var result = arr[index];
  arr.splice(index, 1);

  return result;
};

var getRandomIndexArray = function (arr) {
  var min = 0;
  var max = arr.length - 1;
  var result = Math.round(Math.random() * (max - min) + min);

  return arr[result];
};

var getArrayRandomLength = function (arr) {
  var newArray = [];
  var number = getRandomNumberFromRange(1, arr.length - 1);
  for (var i = 0; i <= number; i++) {
    newArray.push(arr[i]);
  }

  return newArray;
};

var adverts = [];

for (var i = 0; i < 8; i++) {
  var number = getRandomItemArray(ADVERT_NUMBERS);
  var advertLocationX = getRandomNumberFromRange(0, 1160);
  var advertLocationY = getRandomNumberFromRange(130, 630);
  var advertRooms = getRandomNumberFromRange(1, 10);

  var advert = {
    avatar: 'img/avatars/user0' + number + '.png',
    title: 'Заголовок предложения ' + number,
    address: advertLocationX + ', ' + advertLocationY,
    price: getRandomIndexArray(ADVERT_PRICE),
    type: getRandomIndexArray(ADVERT_TYPE),
    rooms: advertRooms,
    guests: advertRooms * 2,
    checkin: getRandomIndexArray(ADVERT_CHECKIN_CHECKOUT),
    checkout: getRandomIndexArray(ADVERT_CHECKIN_CHECKOUT),
    features: getArrayRandomLength(ADVERT_FEATURES),
    description: 'Описание сдающегося объекта ' + number,
    photos: getArrayRandomLength(ADVERT_PHOTOS),
    locationX: advertLocationX + 'px',
    locationY: advertLocationY + 'px',
  };

  adverts.push(advert);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderPin = function (item) {
  var pin = pinTemplate.cloneNode(true);

  pin.querySelector('img').setAttribute('src', item.avatar);
  pin.querySelector('img').setAttribute('alt', item.title);
  pin.style.left = item.locationX;
  pin.style.top = item.locationY;

  return pin;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < 8; j++) {
  fragment.appendChild(renderPin(adverts[j]));
}

mapPins.appendChild(fragment);
