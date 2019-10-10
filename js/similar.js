'use strict';

(function () {
  var Wizard = {
    'wizard-coat': {
      color: null
    },
    'wizard-eyes': {
      color: null
    }
  };

  var setupSimilarElement = document.querySelector('.setup .setup-similar');

  var wizardsArr = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === Wizard['wizard-coat'].color) {
      rank += 2;
    }
    if (wizard.colorEyes === Wizard['wizard-eyes'].color) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var sortWizard = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  };

  var updateWizards = function () {
    window.render.wizards(wizardsArr.slice().sort(sortWizard));
  };

  var showSimilarWizards = function (wizards) {
    wizardsArr = wizards;
    updateWizards();

    setupSimilarElement.classList.remove('hidden');
  };

  var displayError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = errorMessage;

    document.body.appendChild(node);
  };

  var wizardColorFeaturesHandler = window.debounce(function (elem, feature) {
    Wizard[feature].color = elem.style.fill;
    updateWizards();
  });

  window.backend.load(showSimilarWizards, displayError);

  window.similar = {
    showError: displayError,
    wizardColorFeaturesHandler: wizardColorFeaturesHandler
  };
})();
