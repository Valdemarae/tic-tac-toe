const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];

  return {};
})();

const gameController = (function () {
  
  return {};
})();

function createPlayer (name, weapon) {
  let score = 0;
  const getScore = () => score;
  const incrementScore = () => score++;

  return {name, weapon, getScore, incrementScore};
}