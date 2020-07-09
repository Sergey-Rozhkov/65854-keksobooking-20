'use strict';

window.form = (function () {
  var adFormTitleElement = document.querySelector('#title');
  var adFormPriceElement = document.querySelector('#price');
  var adFormTypeElement = document.querySelector('#type');
  var minPrice = 0;
  var fieldsetAdFormElements = document.querySelectorAll('.ad-form fieldset');
  var selectFiltersFormElements = document.querySelectorAll('.map__filters select');
  var fieldsetFiltersFormElement = document.querySelector('.map__features');

  var setFieldsetAdFormDisabled = function () {
    fieldsetAdFormElements.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  };

  var setSelectAdFormDisabled = function () {
    selectFiltersFormElements.forEach(function (select) {
      select.disabled = true;
    });
  };

  var setFieldsetFiltersDisabled = function () {
    fieldsetFiltersFormElement.disabled = true;
  };

  var errorTextField = function (element, valueMissingText, tooShortText, tooLongText) {
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

  var errorNumberField = function () {
    if (adFormPriceElement.validity.valueMissing) {
      adFormPriceElement.setCustomValidity('Обязательное поле');
    } else if (!Number.isInteger(Number(adFormPriceElement.value))) {
      adFormPriceElement.setCustomValidity('Цена за ночь должна быть числом');
    } else if (adFormPriceElement.value > window.constants.PRICE_MAX) {
      adFormPriceElement.setCustomValidity('Цена за ночь не может превышать 1 000 000 руб.');
    } else if (adFormPriceElement.value < minPrice) {
      adFormPriceElement.setCustomValidity('Цена за ночь должна быть не менее ' + minPrice + ' руб.');
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

  var roomsElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var adFormSubmitElement = document.querySelector('.ad-form__submit');

  var comparingFields = function () {
    if (capacityElement.value > roomsElement.value) {
      if (roomsElement.value === '100' && capacityElement.value !== '0') {
        capacityElement.setCustomValidity('При выборе "100 комнат", допускается только вариант "Не для гостей"');
      } else {
        capacityElement.setCustomValidity('Количество гостей не может быть больше количества комнат');
      }
    } else if (capacityElement.value === '0' && roomsElement.value !== '100') {
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
    errorTextField(adFormTitleElement, 'Обязательное поле', 'Заголовок должен состоять минимум из 30-и символов', 'Заголовок не должен превышать 100 символов');
    errorNumberField();
    comparingFields();
  });

  return {
    fieldsetAdFormElements: fieldsetAdFormElements,
    selectFiltersFormElements: selectFiltersFormElements,
    fieldsetFiltersFormElement: fieldsetFiltersFormElement,
    setFieldsetAdFormDisabled: setFieldsetAdFormDisabled,
    setSelectAdFormDisabled: setSelectAdFormDisabled,
    setFieldsetFiltersDisabled: setFieldsetFiltersDisabled
  };
})();
