const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];

  const update = () => {

  }

  return {update};
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