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

  const board = document.querySelector(".board")

  const playGame = () => {
    board.addEventListener("click", (e) => {
      index = e.target.id;
      if (gameController.validMove(index)) {
        gameController.move(index);
    
        if (gameController.playerWon() || gameController.tie()) {

        } else {
          gameController.changePlayer();
        }
      }
    });
  }

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

  const playerWon = () => {
    weapon = nextPlayer.weapon;
    for (let h = 0; h < 3; h++){
      let horizontal = vertical = diagonal1 = diagonal2 = [false, false, false];
      for (let i = 0, j = 0, p = 0, f = 2; i < 3; ++i, j += 3, p += 4, f += 2) {
        if (gameBoard.getContent(i) == weapon) {
          horizontal[i] = true;
        }
        if (gameBoard.getContent(j) == weapon) {
          vertical[i] = true;
        }
        if (gameBoard.getContent(p) == weapon) {
          diagonal1 = true;
        }
        if (gameBoard.getContent(f) == weapon) {
          diagonal2 = true;
        }
      }
      if (horizontal[0] && horizontal[1] && horizontal[2] || vertical[0] && vertical[1] && vertical[2] ||
        diagonal1[0] && diagonal1[1] && diagonal1[2] || diagonal2[0] && diagonal2[1] && diagonal2[2]) {
        return true;
      }
    }
  }

  const tie = () => {
    for (let i = 0; i < 9; i++) {
      if (gameBoard.getContent(i) == '') {
        return false;
      }
    }
    return true;
  }

  return {move, validMove, changePlayer, playGame, playerWon, tie};
})();

function createPlayer (name, weapon) {
  let score = 0;
  const getScore = () => score;
  const incrementScore = () => score++;

  return {name, weapon, getScore, incrementScore};
}

gameController.playGame();