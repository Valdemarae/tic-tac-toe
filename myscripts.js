const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];

  const updateBoard = () => {
    for (let i = 0; i < board.length; i++) {
      const div = document.getElementById(i);
      div.textContent = board[i];
    }
  }

  const updateSquare = (index, char) => {
    board[index] = char;
  }

  const getContent = (index) => {
    return board[index];
  }

  return {updateBoard, updateSquare, getContent};
})();

const gameController = (function () {
  const move = (index) => {
    gameBoard.updateSquare(index, '');
    gameBoard.updateBoard();
  }

  const validMove = (index) => {
    content = gameBoard.getContent(index);
    if (content == '') {
      return true;
    }
    return false;
  }

  return {move, validMove};
})();

function createPlayer (name, weapon) {
  let score = 0;
  const getScore = () => score;
  const incrementScore = () => score++;

  return {name, weapon, getScore, incrementScore};
}

const board = document.querySelector(".board")

board.addEventListener("click", (e) => {
  index = e.target.id;
  if (gameController.validMove(index)) {
    gameController.move(index);
  }
});
