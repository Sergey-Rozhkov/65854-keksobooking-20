'use strict';

window.main = (function () {
  var adverts = [];

  var fillUpAdverts = function (list) {

    list.forEach(function (item) {
      adverts.push(item);
    });

    window.pin.renderPins(adverts);
    window.card.renderCards(adverts);
    window.mapActive.hidePins();
  };

  return {
    fillUpAdverts: fillUpAdverts,
    adverts: adverts
  };
})();
