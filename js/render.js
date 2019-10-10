'use strict';

(function () {
  var AMOUNT_WIZARDS = 4;

  var setupElement = document.querySelector('.setup');
  var setupSimilarListElement = setupElement.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    var amountWizards = (wizards.length > AMOUNT_WIZARDS) ? AMOUNT_WIZARDS : wizards.length;
    setupSimilarListElement.innerHTML = '';

    for (var i = 0; i < amountWizards; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    setupSimilarListElement.appendChild(fragment);
  };

  window.render = {
    wizards: renderWizards
  };
})();
