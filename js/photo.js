'use strict';

window.photo = (function () {
  var photoFileElement = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreviewBlockElement = document.querySelector('.ad-form__photo');

  photoFileElement.addEventListener('change', function () {
    photoPreviewBlockElement.innerHTML = '<img>';

    var photoPreviewElement = photoPreviewBlockElement.querySelector('img');

    photoPreviewElement.alt = '';
    photoPreviewElement.width = '70';
    photoPreviewElement.height = '70';

    var file = photoFileElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var previewPhotoClear = function () {
    photoPreviewBlockElement.querySelector('img').remove();
  };

  return {
    previewPhotoClear: previewPhotoClear
  };
})();
