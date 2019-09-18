'use strict';

var setupElement = document.querySelector('.setup');
var setupSimilarElement = setupElement.querySelector('.setup-similar');
var setupSimilarListElement = setupElement.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var AMOUNT_WIZARDS = 4;

var wizardFeatures = {
  FIRST_NAMES: ['Иван', 'Хуан Себастьян', ' Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  LAST_NAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
    'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomFullName = function (dataWizard) {
  var firstName = getRandomElement(dataWizard.FIRST_NAMES);
  var lastName = getRandomElement(dataWizard.LAST_NAMES);

  return Math.round(Math.random()) ? firstName + ' ' + lastName : lastName + ' ' + firstName;
};

var generateDataWizards = function (dataWizard, amountWizards) {
  var wizards = [];

  for (var i = 0; i < amountWizards; i++) {
    wizards.push({
      name: getRandomFullName(dataWizard),
      coatColor: getRandomElement(dataWizard.COAT_COLORS),
      eyesColor: getRandomElement(dataWizard.EYES_COLORS),
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

var wizardsFeatures = generateDataWizards(wizardFeatures, AMOUNT_WIZARDS);

setupElement.classList.remove('hidden');
setupSimilarElement.classList.remove('hidden');

renderWizards(wizardsFeatures);
