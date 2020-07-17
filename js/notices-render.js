'use strict';

window.noticesRender = (function () {
  var bodyElement = document.querySelector('body');

  var successPopupTemplateElement = document.querySelector('#success')
      .content
      .querySelector('.success');

  var renderSuccessPopup = function () {
    var successPopup = successPopupTemplateElement.cloneNode(true);

    return bodyElement.appendChild(successPopup);
  };

  var errorPopupTemplateElement = document.querySelector('#error')
      .content
      .querySelector('.error');

  var renderErrorPopup = function () {
    var errorPopup = errorPopupTemplateElement.cloneNode(true);

    return bodyElement.appendChild(errorPopup);
  };

  return {
    renderSuccessPopup: renderSuccessPopup,
    renderErrorPopup: renderErrorPopup
  };
})();
