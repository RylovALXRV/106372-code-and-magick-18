'use strict';

var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var COLOR_WHITE = '#ffffff';
var COLOR_BLACK = '#000000';
var GAP = 10;
var GAP_BAR = 50;
var MAX_HEIGHT_BAR = 150;
var WIDTH_BAR = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxValue = function (arr) {
  return Math.round(Math.max.apply(null, arr));
};

var getHeightBar = function (time, maxTime, maxHeight) {
  return Math.round(time * maxHeight / maxTime);
};

var getRandomValue = function (max) {
  return Math.round(Math.random() * max);
};

var renderBar = function (ctx, name, time, maxTime, i) {
  // Отрисовываются параметры игрока
  ctx.fillStyle = COLOR_BLACK;
  ctx.fillText(name, CLOUD_X + GAP * 3 + ((WIDTH_BAR + GAP_BAR) * i), CLOUD_Y + CLOUD_HEIGHT - GAP * 3);
  ctx.fillText(time, CLOUD_X + GAP * 3 + ((WIDTH_BAR + GAP_BAR) * i), CLOUD_Y + CLOUD_HEIGHT - GAP * 3 - getHeightBar(time, maxTime, MAX_HEIGHT_BAR) - GAP * 3);

  // Отрисовывается гистограмма
  ctx.fillStyle = 'hsl(240,' + getRandomValue(100) + '%,50%)';
  if (name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  }
  ctx.fillRect(CLOUD_X + GAP * 3 + ((WIDTH_BAR + GAP_BAR) * i), CLOUD_Y + CLOUD_HEIGHT - GAP * 4, WIDTH_BAR, -(getHeightBar(time, maxTime, MAX_HEIGHT_BAR)));
};

var renderBars = function (ctx, names, time, maxTime) {
  names.forEach(function (name, i) {
    renderBar(ctx, name, Math.round(time[i]), maxTime, i);
  });
};

window.renderStatistics = function (ctx, names, times) {
  var maxTimePlayer = getMaxValue(times);

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_WHITE);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = COLOR_BLACK;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 4);

  renderBars(ctx, names, times, maxTimePlayer);
};
