'use strict';

window.constants = (function () {
  var ADVERT_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8'];
  var ADVERT_PRICES = ['300', '400', '500', '600', '700', '800', '900', '1000'];
  var ADVERT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ADVERT_CHECKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var ADVERT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ADVERT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ADVERT_AMOUNTS = 8;

  return {
    ADVERT_NUMBERS: ADVERT_NUMBERS,
    ADVERT_PRICES: ADVERT_PRICES,
    ADVERT_TYPES: ADVERT_TYPES,
    ADVERT_CHECKINS_CHECKOUTS: ADVERT_CHECKINS_CHECKOUTS,
    ADVERT_FEATURES: ADVERT_FEATURES,
    ADVERT_PHOTOS: ADVERT_PHOTOS,
    ADVERT_AMOUNTS: ADVERT_AMOUNTS
  };
})();
