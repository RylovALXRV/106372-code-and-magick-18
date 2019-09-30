'use strict';

(function () {

  var setColorElementUse = function (elem, feature, selector) {
    elem.style.fill = window.util.getRandomElement(feature);
    document.querySelector(selector).value = elem.style.fill;
  };

  var setColorElementDiv = function (elem, feature, selector) {
    var inputElement = document.querySelector(selector);

    inputElement.value = window.util.getRandomElement(feature);
    elem.style.backgroundColor = inputElement.value;
  };

  window.colorize = function (elem, feature, selector) {
    elem.addEventListener('click', function () {
      if (elem.tagName === 'DIV') {
        setColorElementDiv(elem, feature, selector);
      } else {
        setColorElementUse(elem, feature, selector);
      }
    });
  };
})();
