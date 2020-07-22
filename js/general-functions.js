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

  var errorHandler = function (errorMessage, selector, positionMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 10; margin: 0 auto; text-align: center; background-color: red;';
    node.style.fontSize = '28px';
    node.textContent = errorMessage;

    document.querySelector(selector).insertAdjacentElement(positionMessage, node);
  };

  return {
    getRandomNumberFromRange: getRandomNumberFromRange,
    getRandomItemArray: getRandomItemArray,
    getArrayRandomLength: getArrayRandomLength,
    errorHandler: errorHandler
  };
})();
