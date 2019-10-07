'use strict';

(function () {
  var AMOUNT_WIZARDS = 4;
  var wizardParams = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
      'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var setupElement = document.querySelector('.setup');
  var form = setupElement.querySelector('.setup-wizard-form');
  var setupSimilarElement = setupElement.querySelector('.setup-similar');
  var setupSimilarListElement = setupElement.querySelector('.setup-similar-list');
  var wizardCoatElement = setupElement.querySelector('.setup-wizard .wizard-coat');
  var wizardEyesElement = setupElement.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireballElement = setupElement.querySelector('.setup-fireball');
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

    for (var i = 0; i < AMOUNT_WIZARDS; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    setupSimilarListElement.appendChild(fragment);
  };

  var displayError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = errorMessage;
    document.body.appendChild(node);
  };

  var closePopup = function () {
    setupElement.classList.add('hidden');
  };

  var showSimilarWizards = function (wizards) {
    renderWizards(wizards);

    setupSimilarElement.classList.remove('hidden');
  };

  var setColorUseElement = function (target, feature, selector) {
    target.style.fill = window.util.getRandomElement(feature);

    setupElement.querySelector(selector).value = target.style.fill;
  };

  var setColorDivElement = function (target, feature, selector) {
    var element = setupElement.querySelector(selector);

    element.value = window.util.getRandomElement(feature);
    target.style.backgroundColor = element.value;
  };

  var playerClickHandler = function (evt) {
    switch (evt.target) {
      case wizardCoatElement:
        setColorUseElement(evt.target, wizardParams.COAT_COLORS, 'input[name="coat-color"]');
        break;
      case wizardEyesElement:
        setColorUseElement(evt.target, wizardParams.EYES_COLORS, 'input[name="eyes-color"]');
        break;
      case wizardFireballElement:
        setColorDivElement(evt.target, wizardParams.FIREBALL_COLORS, 'input[name="fireball-color"]');
        break;
    }
  };

  document.querySelector('.setup-player').addEventListener('click', playerClickHandler);

  window.backend.load(showSimilarWizards, displayError);
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), closePopup, displayError);
    evt.preventDefault();
  });
})();
