'use strict';

window.util = (function () {
  return {
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };
})();
