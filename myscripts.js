const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];

  const update = () => {
    for (let i = 0; i < board.length; i++) {
      const div = document.getElementById(i);
      div.textContent = board[i];
    }
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

gameBoard.update();