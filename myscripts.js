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
  const player1 = createPlayer('Player1', 'x');
  const player2 = createPlayer('Player2', 'o');
  let nextPlayer = player1;

  const move = (index) => {
    gameBoard.updateSquare(index, nextPlayer.weapon);
    gameBoard.updateBoard();
  }

  const validMove = (index) => {
    content = gameBoard.getContent(index);
    if (content == '') {
      return true;
    }
    return false;
  }

  const changePlayer = () => {
    if (nextPlayer == player1) {
      nextPlayer = player2;
    } else {
      nextPlayer = player1;
    }
  }

  return {move, validMove, changePlayer};
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
    gameController.changePlayer();
  }
});
