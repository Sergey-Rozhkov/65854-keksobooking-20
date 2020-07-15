'use strict';

window.main = (function () {
  var fillUpAdverts = function (list) {
    var adverts = [];
    list.forEach(function (item) {
      adverts.push(item);
    });

    window.pin.pinsHandler(adverts);
    window.card.cardsHandler(adverts);
  };

  return {
    fillUpAdverts: fillUpAdverts,
  };
})();
