'use strict';

(function () {
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var setupElement = document.querySelector('.setup');
  var buttonCloseElement = setupElement.querySelector('.setup-close');
  var uploadElement = setupElement.querySelector('.upload');
  var userNameInputElement = setupElement.querySelector('.setup-user-name');
  var iconOpenElement = document.querySelector('.setup-open-icon');

  var resetSetupStyles = function () {
    setupElement.style.left = '';
    setupElement.style.top = '';
  };

  var popupCloseClickHandler = function (evt) {
    if (evt.keyCode === KeyCode.ESC && evt.target !== userNameInputElement) {
      closePopup();
    }
  };

  var openPopup = function () {
    setupElement.classList.remove('hidden');

    document.addEventListener('keydown', popupCloseClickHandler);
  };

  var closePopup = function () {
    setupElement.classList.add('hidden');

    resetSetupStyles();

    document.removeEventListener('keydown', popupCloseClickHandler);
  };

  var enterKeydownHandler = function (evt, callback) {
    if (evt.keyCode === KeyCode.ENTER) {
      callback();
    }
  };

  iconOpenElement.addEventListener('click', function () {
    openPopup();
  });

  iconOpenElement.addEventListener('keydown', function (evt) {
    enterKeydownHandler(evt, openPopup);
  });

  buttonCloseElement.addEventListener('click', function () {
    closePopup();
  });

  buttonCloseElement.addEventListener('keydown', function (evt) {
    enterKeydownHandler(evt, closePopup);
  });

  uploadElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var setupMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';
      setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
    };

    var setupMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var preventDefaultClickHandler = function (clickEvt) {
          clickEvt.preventDefault();

          uploadElement.removeEventListener('click', preventDefaultClickHandler);
        };
        uploadElement.addEventListener('click', preventDefaultClickHandler);
      }

      document.removeEventListener('mousemove', setupMousemoveHandler);
      document.removeEventListener('mouseup', setupMouseupHandler);
    };

    document.addEventListener('mousemove', setupMousemoveHandler);
    document.addEventListener('mouseup', setupMouseupHandler);
  });
})();
