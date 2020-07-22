'use strict';

window.avatar = (function () {
  var avatarFileElement = document.querySelector('.ad-form-header__upload input[type=file]');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');

  avatarFileElement.addEventListener('change', function () {
    var file = avatarFileElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var previewAvatarClear = function () {
    avatarPreviewElement.src = window.constants.AVATAR_DEFAULT;
  };

  return {
    previewAvatarClear: previewAvatarClear,
    avatarPreviewElement: avatarPreviewElement
  };
})();
