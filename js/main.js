'use strict';

window.main = (function () {
  var adverts = [];

  var fillUpAdverts = function (list) {

    list.forEach(function (item) {
      adverts.push(item);
    });

    window.pin.pinsHandler(adverts);
    window.card.cardsHandler(adverts);
    window.mapActive.hidePins();
  };

  return {
    fillUpAdverts: fillUpAdverts,
    adverts: adverts
  };
})();
