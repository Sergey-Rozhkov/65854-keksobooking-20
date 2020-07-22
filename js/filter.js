'use strict';

window.filter = (function () {
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

  var updatePins = function () {
    if (housingTypeElement.value === 'any' && housingPriceElement.value === 'any' && housingRoomsElement.value === 'any' && housingGuestsElement.value === 'any' && choosedFeatures === []) {
      sameHouses = window.main.adverts;
    } else {
      sameHouses = window.main.filteredAdverts.filter(function (advert) {
        if (housingTypeElement.value === 'any') {
          return advert;
        } else {
          return advert.offer.type === housingTypeElement.value;
        }
      }).filter(function (advert) {
        if (housingPriceElement.value === 'any') {
          return advert;
        } else if (housingPriceElement.value === 'low') {
          return advert.offer.price < 10000;
        } else if (housingPriceElement.value === 'middle') {
          return advert.offer.price >= 10000 && advert.offer.price <= 50000;
        } else if (housingPriceElement.value === 'high') {
          return advert.offer.price > 50000;
        }
      }).filter(function (advert) {
        if (housingRoomsElement.value === 'any') {
          return advert;
        } else {
          return advert.offer.rooms === parseInt(housingRoomsElement.value, 10);
        }
      }).filter(function (advert) {
        if (housingGuestsElement.value === 'any') {
          return advert;
        } else {
          return advert.offer.guests === parseInt(housingGuestsElement.value, 10);
        }
      }).filter(function (advert) {
        var amount = 0;
        advert.offer.features.filter(function (item) {
          if (choosedFeatures.includes(item)) {
            amount += 1;
          }
        });
        if (choosedFeatures.length === amount) {
          return advert;
        }
      });
    }

    window.pin.renderPins(sameHouses);
    window.card.renderCards(sameHouses);
    window.popup.showCard();
    window.popup.popupCardClose();
  };

  housingTypeElement.addEventListener('change', function () {
    // updatePins();
    window.generalFunctions.debounce(updatePins());
  });

  housingPriceElement.addEventListener('change', function () {
    // updatePins();
    window.generalFunctions.debounce(updatePins());
  });

  housingRoomsElement.addEventListener('change', function () {
    // updatePins();
    window.generalFunctions.debounce(updatePins());
  });

  housingGuestsElement.addEventListener('change', function () {
    // updatePins();
    window.generalFunctions.debounce(updatePins());
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
      // updatePins();
      window.generalFunctions.debounce(updatePins());
    });
  };

  housingFeaturesElements.forEach(function (feature) {
    featureChange(feature);
  });

  return {
    filterClear: filterClear
  };
})();
