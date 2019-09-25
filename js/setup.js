'use strict';

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
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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

  setupSimilarListElement.appendChild(fragment);
};

var wizards = generateWizards(AMOUNT_WIZARDS);

var showSimilarWizards = function () {
  renderWizards(wizards);

  setupSimilarElement.classList.remove('hidden');
};

showSimilarWizards();

/* ----- Учебный проект: одеть Надежду ----- */

var KeyCode = {
  ENTER: 13,
  ESC: 27
};

var buttonCloseElement = setupElement.querySelector('.setup-close');
var fireballInputElement = setupElement.querySelector('input[name="fireball-color"]');
var iconOpenElement = document.querySelector('.setup-open-icon');
var userNameInputElement = setupElement.querySelector('.setup-user-name');
var wizardCoatElement = setupElement.querySelector('.setup-wizard .wizard-coat');
var wizardEyesElement = setupElement.querySelector('.setup-wizard .wizard-eyes');
var wizardFireballElement = setupElement.querySelector('.setup-fireball');

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

  document.removeEventListener('keydown', popupCloseClickHandler);
};

var setColorElement = function (target, feature, selector) {
  target.style.fill = getRandomElement(feature);

  setupElement.querySelector(selector).value = target.style.fill;
};

var playerClickHandler = function (evt) {
  switch (evt.target) {
    case wizardCoatElement:
      setColorElement(evt.target, wizardParams.COAT_COLORS, 'input[name="coat-color"]');
      return;
    case wizardEyesElement:
      setColorElement(evt.target, wizardParams.EYES_COLORS, 'input[name="eyes-color"]');
      return;
    case wizardFireballElement:
      fireballInputElement.value = getRandomElement(wizardParams.FIREBALL_COLORS);
      evt.target.style.backgroundColor = fireballInputElement.value;
      return;
  }
};

iconOpenElement.addEventListener('click', function () {
  openPopup();
});

iconOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    openPopup();
  }
});

buttonCloseElement.addEventListener('click', function () {
  closePopup();
});

buttonCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    closePopup();
  }
});

document.querySelector('.setup-player').addEventListener('click', playerClickHandler);
