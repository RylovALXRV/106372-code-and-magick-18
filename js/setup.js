'use strict';

(function () {
  var AMOUNT_WIZARDS = 4;
  var wizardParams = {
    FIRST_NAMES: ['Иван', 'Хуан Себастьян', ' Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    LAST_NAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
      'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var setupElement = document.querySelector('.setup');
  var setupSimilarElement = setupElement.querySelector('.setup-similar');
  var setupSimilarListElement = setupElement.querySelector('.setup-similar-list');
  var wizardCoatElement = setupElement.querySelector('.setup-wizard .wizard-coat');
  var wizardEyesElement = setupElement.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireballElement = setupElement.querySelector('.setup-fireball');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var getRandomFullName = function (wizard) {
    var firstName = window.util.getRandomElement(wizard.FIRST_NAMES);
    var lastName = window.util.getRandomElement(wizard.LAST_NAMES);

    return Math.round(Math.random()) ? firstName + ' ' + lastName : lastName + ' ' + firstName;
  };

  var generateWizards = function (amount) {
    var wizards = [];

    for (var i = 0; i < amount; i++) {
      wizards.push({
        name: getRandomFullName(wizardParams),
        coatColor: window.util.getRandomElement(wizardParams.COAT_COLORS),
        eyesColor: window.util.getRandomElement(wizardParams.EYES_COLORS),
      });
    }

    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });

    setupSimilarListElement.appendChild(fragment);
  };

  var wizards = generateWizards(AMOUNT_WIZARDS);

  var showSimilarWizards = function () {
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

  showSimilarWizards();

  document.querySelector('.setup-player').addEventListener('click', playerClickHandler);
})();

