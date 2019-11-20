module.exports = function minMaxRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

