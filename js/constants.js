'use strict';

window.constants = (function () {
  var ADVERT_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8'];
  var ADVERT_PRICES = ['300', '400', '500', '600', '700', '800', '900', '1000'];
  var ADVERT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ADVERT_CHECKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var ADVERT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ADVERT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ADVERT_AMOUNTS = 8;
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = 1140;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 10;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
  var PRICE_MAX = 1000000;
  var BUNGALO_PRICE_MIN = 0;
  var FLAT_PRICE_MIN = 1000;
  var HOUSE_PRICE_MIN = 5000;
  var PALACE_PRICE_MIN = 10000;

  return {
    ADVERT_NUMBERS: ADVERT_NUMBERS,
    ADVERT_PRICES: ADVERT_PRICES,
    ADVERT_TYPES: ADVERT_TYPES,
    ADVERT_CHECKINS_CHECKOUTS: ADVERT_CHECKINS_CHECKOUTS,
    ADVERT_FEATURES: ADVERT_FEATURES,
    ADVERT_PHOTOS: ADVERT_PHOTOS,
    ADVERT_AMOUNTS: ADVERT_AMOUNTS,
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_X_MAX: LOCATION_X_MAX,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    ROOMS_MIN: ROOMS_MIN,
    ROOMS_MAX: ROOMS_MAX,
    GUESTS_MIN: GUESTS_MIN,
    GUESTS_MAX: GUESTS_MAX,
    PRICE_MAX: PRICE_MAX,
    BUNGALO_PRICE_MIN: BUNGALO_PRICE_MIN,
    FLAT_PRICE_MIN: FLAT_PRICE_MIN,
    HOUSE_PRICE_MIN: HOUSE_PRICE_MIN,
    PALACE_PRICE_MIN: PALACE_PRICE_MIN
  };
})();
