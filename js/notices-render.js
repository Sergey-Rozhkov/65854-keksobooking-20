'use strict';

window.noticesRender = (function () {
  var mainElement = document.querySelector('main');

  var successPopupTemplateElement = document.querySelector('#success')
      .content
      .querySelector('.success');

  var renderSuccessPopup = function () {
    var successPopup = successPopupTemplateElement.cloneNode(true);

    return mainElement.appendChild(successPopup);
  };

  var errorPopupTemplateElement = document.querySelector('#error')
      .content
      .querySelector('.error');

  var renderErrorPopup = function () {
    var errorPopup = errorPopupTemplateElement.cloneNode(true);

    return mainElement.appendChild(errorPopup);
  };

  return {
    renderSuccessPopup: renderSuccessPopup,
    renderErrorPopup: renderErrorPopup
  };
})();
