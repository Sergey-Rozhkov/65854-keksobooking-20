'use strict';

window.form = (function () {
  var adFormTitleElement = document.querySelector('#title');
  var addressFormElement = document.querySelector('#address');
  var adFormPriceElement = document.querySelector('#price');
  var adFormTypeElement = document.querySelector('#type');
  var fieldsetFiltersFormElement = document.querySelector('.map__features');
  var fieldsetAdFormElements = document.querySelectorAll('.ad-form fieldset');
  var selectFiltersFormElements = document.querySelectorAll('.map__filters select');
  var submitFormElement = document.querySelector('.ad-form__submit');
  var resetFormElement = document.querySelector('.ad-form__reset');
  var minPrice = 0;

  var setFieldsetAdFormDisabled = function (isDisabled) {
    fieldsetAdFormElements.forEach(function (fieldset) {
      fieldset.disabled = isDisabled;
    });
  };

  var setSelectAdFormDisabled = function (isDisabled) {
    selectFiltersFormElements.forEach(function (select) {
      select.disabled = isDisabled;
    });
  };

  var setFieldsetFiltersDisabled = function (isDisabled) {
    fieldsetFiltersFormElement.disabled = isDisabled;
  };

  var showErrorTextField = function (element, valueMissingText, tooShortText, tooLongText) {
    element.addEventListener('invalid', function () {
      if (element.validity.valueMissing) {
        element.setCustomValidity(valueMissingText);
      } else if (element.validity.tooShort) {
        element.setCustomValidity(tooShortText);
      } else if (element.validity.tooLong) {
        element.setCustomValidity(tooLongText);
      } else {
        element.setCustomValidity('');
      }
    });
  };

  var showErrorNumberField = function () {
    if (adFormPriceElement.value < minPrice) {
      adFormPriceElement.setCustomValidity('Цена за ночь должна быть не менее ' + minPrice + ' руб.');
    } else if (adFormPriceElement.value > window.constants.PRICE_MAX) {
      adFormPriceElement.setCustomValidity('Цена за ночь не может превышать 1 000 000 руб.');
    } else if (!Number.isInteger(Number(adFormPriceElement.value))) {
      adFormPriceElement.setCustomValidity('Цена за ночь должна быть числом');
    } else if (adFormPriceElement.validity.valueMissing) {
      adFormPriceElement.setCustomValidity('Обязательное поле');
    } else {
      adFormPriceElement.setCustomValidity('');
    }
  };

  var setMinPrice = function () {
    if (adFormTypeElement.value === 'bungalo') {
      adFormPriceElement.placeholder = window.constants.BUNGALO_PRICE_MIN;
      minPrice = window.constants.BUNGALO_PRICE_MIN;
    } else if (adFormTypeElement.value === 'flat') {
      adFormPriceElement.placeholder = window.constants.FLAT_PRICE_MIN;
      minPrice = window.constants.FLAT_PRICE_MIN;
    } else if (adFormTypeElement.value === 'house') {
      adFormPriceElement.placeholder = window.constants.HOUSE_PRICE_MIN;
      minPrice = window.constants.HOUSE_PRICE_MIN;
    } else if (adFormTypeElement.value === 'palace') {
      adFormPriceElement.placeholder = window.constants.PALACE_PRICE_MIN;
      minPrice = window.constants.PALACE_PRICE_MIN;
    }
  };

  setMinPrice();

  adFormTypeElement.addEventListener('change', function () {
    setMinPrice();
  });

  var roomElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var adFormSubmitElement = document.querySelector('.ad-form__submit');

  var comparingFields = function () {
    if (capacityElement.value > roomElement.value) {
      if (roomElement.value === '100' && capacityElement.value !== '0') {
        capacityElement.setCustomValidity('При выборе "100 комнат", допускается только вариант "Не для гостей"');
      } else {
        capacityElement.setCustomValidity('Количество гостей не может быть больше количества комнат');
      }
    } else if (capacityElement.value === '0' && roomElement.value !== '100') {
      capacityElement.setCustomValidity('При выборе "Не для гостей", допускается только вариант "100 комнат"');
    } else {
      capacityElement.setCustomValidity('');
    }
  };

  var adFormTimeinElement = document.querySelector('#timein');
  var adFormTimeoutElement = document.querySelector('#timeout');

  var setTimeInOut = function (elementFirst, elementSecond) {
    elementFirst.addEventListener('change', function () {
      elementSecond.value = elementFirst.value;
    });
  };

  setTimeInOut(adFormTimeinElement, adFormTimeoutElement);
  setTimeInOut(adFormTimeoutElement, adFormTimeinElement);

  adFormSubmitElement.addEventListener('click', function () {
    showErrorTextField(adFormTitleElement, 'Обязательное поле', 'Заголовок должен состоять минимум из 30-и символов', 'Заголовок не должен превышать 100 символов');
    showErrorNumberField();
    comparingFields();
  });

  var setCoords = function (elem, position) {
    var box = elem.getBoundingClientRect();
    var boxTop = (position === 'center') ? (box.top + (box.width / 2) + pageYOffset) : (box.top + box.width + pageYOffset);
    var boxLeft = box.left - (box.height / 2) + pageXOffset;

    addressFormElement.value = Math.round(boxLeft) + ', ' + Math.round(boxTop);
  };

  var adFormElement = document.querySelector('.ad-form');

  var cleanForm = function () {
    adFormElement.reset();
    setMinPrice();
  };

  var successSubmitHandler = function () {
    cleanForm();
    setCoords(window.mapActive.mapPinMainElement, 'center');
    window.mapActive.setInactiveState();
    window.filter.filterClear();
    window.avatar.previewAvatarClear();
    window.photo.previewPhotoClear();
  };

  var errorFormHandler = function () {
    window.notices.showErrorPopup();
  };

  adFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adFormElement), successSubmitHandler, errorFormHandler, true);
    evt.preventDefault();
  });

  resetFormElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    cleanForm();
    window.mapActive.setDefaultPinPosition();
    window.mapActive.setInactiveState();
    window.popup.hideCards();
    window.filter.filterClear();
    window.avatar.previewAvatarClear();
    window.photo.previewPhotoClear();
  });

  return {
    fieldsetAdFormElements: fieldsetAdFormElements,
    selectFiltersFormElements: selectFiltersFormElements,
    fieldsetFiltersFormElement: fieldsetFiltersFormElement,
    submitFormElement: submitFormElement,
    resetFormElement: resetFormElement,
    setFieldsetAdFormDisabled: setFieldsetAdFormDisabled,
    setSelectAdFormDisabled: setSelectAdFormDisabled,
    setFieldsetFiltersDisabled: setFieldsetFiltersDisabled,
    setCoords: setCoords
  };
})();
