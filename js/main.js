'use strict';

window.main = (function () {
  var adverts = [];
  var filteredAdverts = [];

  var fillUpAdverts = function (list) {

    list.forEach(function (item) {
      adverts.push(item);
    });
    list.forEach(function (item) {
      filteredAdverts.push(item);
    });
  };

  return {
    fillUpAdverts: fillUpAdverts,
    adverts: adverts,
    filteredAdverts: filteredAdverts
  };
})();
