'use strict';

window.generalFunctions = (function () {
  var errorHandler = function (errorMessage, selector, positionMessage) {
    var node = document.createElement('div');

    node.style.zIndex = '10';
    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.style.fontSize = '28px';
    node.textContent = errorMessage;

    document.querySelector(selector).insertAdjacentElement(positionMessage, node);
  };

  return {
    errorHandler: errorHandler
  };
})();
