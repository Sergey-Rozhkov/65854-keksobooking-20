'use strict';

window.notices = (function () {
  window.noticesRender.renderSuccessPopup();

  window.noticesRender.renderErrorPopup();

  var successPopupElement = document.querySelector('.success');
  var successMessageElement = document.querySelector('.success__message');
  var errorPopupElement = document.querySelector('.error');
  var errorMessageElement = document.querySelector('.error__message');
  var errorButtonElement = document.querySelector('.error__button');

  successPopupElement.classList.add('hidden');

  errorPopupElement.classList.add('hidden');

  var showSuccessPopup = function () {
    successPopupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPressEscSuccessPopup);
    document.addEventListener('click', onClickSuccessPopup);
  };

  var onPressEscSuccessPopup = function (evt) {
    if (evt.key === 'Escape') {
      successPopupElement.classList.add('hidden');
      document.removeEventListener('keydown', onPressEscSuccessPopup);
    }
  };

  var onClickSuccessPopup = function (evt) {
    if (evt.target !== successMessageElement) {
      successPopupElement.classList.add('hidden');
      document.removeEventListener('click', onClickSuccessPopup);
    }
  };

  var showErrorPopup = function () {
    errorPopupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPressEscErrorPopup);
    document.addEventListener('click', onClickErrorPopup);
    errorButtonElement.addEventListener('click', function () {
      errorPopupElement.classList.add('hidden');
    });
  };

  var onPressEscErrorPopup = function (evt) {
    if (evt.key === 'Escape') {
      errorPopupElement.classList.add('hidden');
      document.removeEventListener('keydown', onPressEscErrorPopup);
    }
  };

  var onClickErrorPopup = function (evt) {
    if (evt.target !== errorMessageElement) {
      errorPopupElement.classList.add('hidden');
      document.removeEventListener('click', onClickErrorPopup);
    }
  };

  return {
    showSuccessPopup: showSuccessPopup,
    showErrorPopup: showErrorPopup
  };
})();
