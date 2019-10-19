'use strict';

(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

  var uploadFile = document.querySelector('.upload');
  var avatarFile = uploadFile.querySelector('input[type=file]');
  var avatarUserElement = uploadFile.querySelector('.setup-user-pic');
  var avatarOpenElement = document.querySelector('.setup-open .setup-open-icon');

  avatarFile.addEventListener('change', function () {
    var file = avatarFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarUserElement.src = reader.result;
        avatarOpenElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
