'use strict';

window.filter = (function () {
  var mapFiltersElement = document.querySelector('.map__filters');
  var selectFiltersElements = mapFiltersElement.querySelectorAll('select');
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var housingFeaturesElement = document.querySelector('#housing-features');
  var housingFeaturesElements = housingFeaturesElement.querySelectorAll('input[name="features"]');
  var sameHouses = [];
  var choosedFeatures = [];

  var filterClear = function () {
    housingTypeElement.value = 'any';
    housingPriceElement.value = 'any';
    housingRoomsElement.value = 'any';
    housingGuestsElement.value = 'any';

    housingFeaturesElements.forEach(function (item) {
      if (item.classList.contains('checked')) {
        item.classList.remove('checked');
        item.checked = false;
      }
    });
  };

  var getSelectsValue = function () {
    selectFiltersElements.forEach(function (select) {
      return select.value !== 'any';
    });
  };

  var selectsValue = getSelectsValue();

  var updatePins = function () {
    if (!selectsValue && choosedFeatures === []) {
      sameHouses = window.main.adverts;
    } else {
      sameHouses = window.main.filteredAdverts.filter(function (advert) {
        return advert.offer.type === housingTypeElement.value || housingTypeElement.value === 'any';
      }).filter(function (advert) {
        if (housingPriceElement.value === 'low') {
          return advert.offer.price < window.constants.LOW_PRICE;
        } else if (housingPriceElement.value === 'middle') {
          return advert.offer.price >= window.constants.LOW_PRICE && advert.offer.price <= window.constants.HIGH_PRICE;
        } else if (housingPriceElement.value === 'high') {
          return advert.offer.price > window.constants.HIGH_PRICE;
        }
        return true;
      }).filter(function (advert) {
        return advert.offer.rooms === parseInt(housingRoomsElement.value, 10) || housingRoomsElement.value === 'any';
      }).filter(function (advert) {
        return advert.offer.guests === parseInt(housingGuestsElement.value, 10) || housingGuestsElement.value === 'any';
      }).filter(function (advert) {
        var amount = 0;
        advert.offer.features.filter(function (item) {
          if (choosedFeatures.includes(item)) {
            amount += 1;
          }
        });
        return choosedFeatures.length === amount;
      });
    }

    window.pin.renderPins(sameHouses);
    window.card.renderCards(sameHouses);
    window.popup.showCard();
    window.popup.popupCardClose();
  };

  housingTypeElement.addEventListener('change', function () {
    window.debounce(updatePins());
  });

  housingPriceElement.addEventListener('change', function () {
    window.debounce(updatePins());
  });

  housingRoomsElement.addEventListener('change', function () {
    window.debounce(updatePins());
  });

  housingGuestsElement.addEventListener('change', function () {
    window.debounce(updatePins());
  });

  var featureChange = function (item) {
    item.addEventListener('change', function () {
      if (item.classList.contains('checked')) {
        item.classList.remove('checked');
        choosedFeatures.forEach(function (featuresItem, index) {
          if (featuresItem === item.value) {
            choosedFeatures.splice(index, 1);
          }
        });
      } else {
        item.classList.add('checked');
        choosedFeatures.push(item.value);
      }
      window.debounce(updatePins());
    });
  };

  housingFeaturesElements.forEach(function (feature) {
    featureChange(feature);
  });

  return {
    filterClear: filterClear
  };
})();
