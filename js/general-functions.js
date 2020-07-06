'use strict';

window.generalFunctions = (function () {
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

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      hideCard();
    }
  };

  return {
    getRandomNumberFromRange: getRandomNumberFromRange,
    getRandomItemArray: getRandomItemArray,
    getArrayRandomLength: getArrayRandomLength,
    onPopupEscPress: onPopupEscPress
  }
})();
