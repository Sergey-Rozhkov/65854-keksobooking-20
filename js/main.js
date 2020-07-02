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

var mapElement = document.querySelector('.map');
var adFormElement = document.querySelector('.ad-form');
var fieldsetAdFormElements = document.querySelectorAll('.ad-form fieldset');
var selectFiltersFormElements = document.querySelectorAll('.map__filters select');
var fieldsetFiltersFormElement = document.querySelector('.map__features');

fieldsetAdFormElements.forEach(function (fieldset) {
  fieldset.disabled = true;
});

selectFiltersFormElements.forEach(function (select) {
  select.disabled = true;
});

fieldsetFiltersFormElement.disabled = true;

var getActiveState = function () {
  mapElement.classList.remove('map--faded');
  adFormElement.classList.remove('ad-form--disabled');

  fieldsetAdFormElements.forEach(function (fieldset) {
    fieldset.disabled = false;
  });

  selectFiltersFormElements.forEach(function (select) {
    select.disabled = false;
  });

  fieldsetFiltersFormElement.disabled = false;

  showPins();
};

var mapPinMainElement = document.querySelector('.map__pin--main');
var addressFormElement = document.querySelector('#address');

var getCoords = function (elem, position) {
  var box = elem.getBoundingClientRect();
  var boxTop = (position === 'center') ? (box.top + (box.width / 2) + pageYOffset) : (box.top + box.width + pageYOffset);
  var boxLeft = box.left - (box.height / 2) + pageXOffset;

  addressFormElement.value = Math.round(boxTop) + ', ' + Math.round(boxLeft);

  return addressFormElement.value;
};

getCoords(mapPinMainElement, 'center');

mapPinMainElement.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    getActiveState();
    getCoords(mapPinMainElement, 'bottom');
  }
});

mapPinMainElement.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    getActiveState();
    getCoords(mapPinMainElement, 'bottom');
  }
});

var adFormTitleElement = document.querySelector('#title');
var adFormPriceElement = document.querySelector('#price');
var adFormTypeElement = document.querySelector('#type');
var minPrice = 0;

var errorTextField = function (element, valueMissingText, tooShortText, tooLongText) {
  element.addEventListener('invalid', function () {
    if (element.validity.valueMissing) {
      element.setCustomValidity(valueMissingText);
    } else if (element.validity.tooShort) {
      element.setCustomValidity(tooShortText);
    } else if (element.validity.tooLong) {
      element.setCustomValidity(tooLongText);
    } else {
      element.setCustomValidity('');
    }
  });
};

var errorNumberField = function () {
  if (adFormPriceElement.validity.valueMissing) {
    adFormPriceElement.setCustomValidity('Обязательное поле');
  } else if (!Number.isInteger(Number(adFormPriceElement.value))) {
    adFormPriceElement.setCustomValidity('Цена за ночь должна быть числом');
  } else if (adFormPriceElement.value > 1000000) {
    adFormPriceElement.setCustomValidity('Цена за ночь не может превышать 1 000 000 руб.');
  } else if (adFormPriceElement.value < minPrice) {
    adFormPriceElement.setCustomValidity('Цена за ночь должна быть не менее ' + minPrice + ' руб.');
  } else {
    adFormPriceElement.setCustomValidity('');
  }
};

var getMinPrice = function () {
  if (adFormTypeElement.value === 'bungalo') {
    adFormPriceElement.placeholder = '0';
    minPrice = 0;
  } else if (adFormTypeElement.value === 'flat') {
    adFormPriceElement.placeholder = '1 000';
    minPrice = 1000;
  } else if (adFormTypeElement.value === 'house') {
    adFormPriceElement.placeholder = '5 000';
    minPrice = 5000;
  } else if (adFormTypeElement.value === 'palace') {
    adFormPriceElement.placeholder = '10 000';
    minPrice = 10000;
  }
};

getMinPrice();

adFormTypeElement.addEventListener('change', function () {
  getMinPrice();
});

var roomsElement = document.querySelector('#room_number');
var capacityElement = document.querySelector('#capacity');
var adFormSubmitElement = document.querySelector('.ad-form__submit');

var comparingFields = function () {
  if (capacityElement.value > roomsElement.value) {
    if (roomsElement.value === '100' && capacityElement.value !== '0') {
      capacityElement.setCustomValidity('При выборе "100 комнат", допускается только вариант "Не для гостей"');
    } else {
      capacityElement.setCustomValidity('Количество гостей не может быть больше количества комнат');
    }
  } else if (capacityElement.value === '0' && roomsElement.value !== '100') {
    capacityElement.setCustomValidity('При выборе "Не для гостей", допускается только вариант "100 комнат"');
  } else {
    capacityElement.setCustomValidity('');
  }
};

var adFormTimeinElement = document.querySelector('#timein');
var adFormTimeoutElement = document.querySelector('#timeout');

var getTimeInOut = function (elementFirst, elementSecond) {
  elementFirst.addEventListener('change', function () {
    elementSecond.value = elementFirst.value;
  });
};

getTimeInOut(adFormTimeinElement, adFormTimeoutElement);
getTimeInOut(adFormTimeoutElement, adFormTimeinElement);

adFormSubmitElement.addEventListener('click', function () {
  errorTextField(adFormTitleElement, 'Обязательное поле', 'Заголовок должен состоять минимум из 30-и символов', 'Заголовок не должен превышать 100 символов');
  errorNumberField();
  comparingFields();
});

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

var getPins = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < ADVERT_AMOUNTS; j++) {
    fragment.appendChild(renderPin(adverts[j]));
  }

  mapPinsElement.appendChild(fragment);
};

getPins();

var mapPinElements = document.querySelectorAll('.map__pin[type="button"]');

mapPinElements.forEach(function (item, index) {
  item.addEventListener('focus', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      mapCardElements[index].classList.remove('hidden');
    }
  });
});

var hidePins = function () {
  mapPinElements.forEach(function (item) {
    item.classList.add('hidden');
  });

  document.removeEventListener('keydown', onPopupEscPress);
};

var showPins = function () {
  mapPinElements.forEach(function (item) {
    item.classList.remove('hidden');
  });

  document.addEventListener('keydown', onPopupEscPress);
};

hidePins();

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

var getCards = function () {
  var fragmentCard = document.createDocumentFragment();

  for (var x = 0; x < ADVERT_AMOUNTS; x++) {
    fragmentCard.appendChild(renderCard(adverts[x]));
  }

  mapElement.insertBefore(fragmentCard, mapFilterElement);
};

getCards();

var mapCardElements = document.querySelectorAll('.map__card');

var hideCard = function () {
  mapCardElements.forEach(function (item) {
    if (!item.classList.contains('hidden')) {
      item.classList.add('hidden');
    }
  });
};

hideCard();

var getShowCard = function (pinElement, cardElement) {
  pinElement.addEventListener('click', function () {
    hideCard();
    cardElement.classList.remove('hidden');
  });
};

for (var y = 0; y < ADVERT_AMOUNTS; y++) {
  getShowCard(mapPinElements[y], mapCardElements[y]);
}

var popupCloseElements = document.querySelectorAll('.popup__close');

var closePopupCard = function (button) {
  button.addEventListener('click', function () {
    button.closest('.map__card').classList.add('hidden');
  });

  document.removeEventListener('keydown', onPopupEscPress);
};

for (var z = 0; z < ADVERT_AMOUNTS; z++) {
  closePopupCard(popupCloseElements[z]);
}

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideCard();
  }
};
