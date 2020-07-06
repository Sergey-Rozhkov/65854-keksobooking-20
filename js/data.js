'use strict';

window.data = (function () {
  var adverts = [];

    var collectAdverts = function () {
      for (var i = 0; i < window.constants.ADVERT_AMOUNTS; i++) {
        var number = window.generalFunctions.getRandomItemArray(window.constants.ADVERT_NUMBERS);
        var advertLocationX = window.generalFunctions.getRandomNumberFromRange(0, 1160);
        var advertLocationY = window.generalFunctions.getRandomNumberFromRange(130, 630);
        var advertRooms = window.generalFunctions.getRandomNumberFromRange(1, 10);

        var advert = {
          author: {
            avatar: 'img/avatars/user0' + number + '.png',
          },
          offer: {
            title: 'Заголовок предложения ' + number,
            address: advertLocationX + ', ' + advertLocationY,
            price: window.constants.ADVERT_PRICES[window.generalFunctions.getRandomNumberFromRange(0, window.constants.ADVERT_PRICES.length - 1)],
            type: window.constants.ADVERT_TYPES[window.generalFunctions.getRandomNumberFromRange(0, window.constants.ADVERT_TYPES.length - 1)],
            rooms: advertRooms,
            guests: advertRooms * 2,
            checkin: window.constants.ADVERT_CHECKINS_CHECKOUTS[window.generalFunctions.getRandomNumberFromRange(0, window.constants.ADVERT_CHECKINS_CHECKOUTS.length - 1)],
            checkout: window.constants.ADVERT_CHECKINS_CHECKOUTS[window.generalFunctions.getRandomNumberFromRange(0, window.constants.ADVERT_CHECKINS_CHECKOUTS.length - 1)],
            features: window.generalFunctions.getArrayRandomLength(window.constants.ADVERT_FEATURES),
            description: 'Описание сдающегося объекта ' + number,
            photos: window.generalFunctions.getArrayRandomLength(window.constants.ADVERT_PHOTOS),
          },
          location: {
            x: advertLocationX + 'px',
            y: advertLocationY + 'px',
          }
        };

        adverts.push(advert);
      }

      return adverts;
    }

  return {
    collectAdverts: collectAdverts
  }
})();
