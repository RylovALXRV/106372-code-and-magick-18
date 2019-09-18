'use strict';

var AMOUNT_WIZARDS = 4;

var setupElement = document.querySelector('.setup');
var setupSimilarElement = setupElement.querySelector('.setup-similar');
var setupSimilarListElement = setupElement.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardParams = {
  FIRST_NAMES: ['Иван', 'Хуан Себастьян', ' Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  LAST_NAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
    'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomFullName = function (wizard) {
  var firstName = getRandomElement(wizard.FIRST_NAMES);
  var lastName = getRandomElement(wizard.LAST_NAMES);

  return Math.round(Math.random()) ? firstName + ' ' + lastName : lastName + ' ' + firstName;
};

var generateWizards = function (amount) {
  var wizards = [];

  for (var i = 0; i < amount; i++) {
    wizards.push({
      name: getRandomFullName(wizardParams),
      coatColor: getRandomElement(wizardParams.COAT_COLORS),
      eyesColor: getRandomElement(wizardParams.EYES_COLORS),
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

  setupSimilarElement.classList.remove('hidden');
  setupSimilarListElement.appendChild(fragment);
};

var wizards = generateWizards(AMOUNT_WIZARDS);

setupElement.classList.remove('hidden');

renderWizards(wizards);
