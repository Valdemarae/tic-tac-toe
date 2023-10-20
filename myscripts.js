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

  const clear = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
    gameBoard.updateBoard();
  }

  return {updateBoard, updateSquare, getContent, clear};
})();

const gameController = (function () {
  const player1 = createPlayer('Player1', 'x');
  const player2 = createPlayer('Player2', 'o');
  
  let nextPlayer = player1;

  const playGame = () => {
    board.addEventListener("click", (e) => {
      let index = e.target.id;
      if (gameController.validMove(index)) {
        gameController.move(index);
    
        if (gameController.playerWon() || gameController.tie()) {
          if (gameController.playerWon()) {
            nextPlayer.incrementScore();
          }
          console.log("hi");
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
    let content = gameBoard.getContent(index);
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
    let weapon = nextPlayer.weapon;
    let i = 0;
    for (let h = 0; h < 3; h++){
      let j = h;
      let horizontal = [false, false, false], vertical = [false, false, false];
      for (let c = 0; c < 3; ++i, j += 3, c++) {
        if (gameBoard.getContent(i) == weapon) {
          horizontal[c] = true;
        }
        if (gameBoard.getContent(j) == weapon) {
          vertical[c] = true;
        }
      }

      if (horizontal[0] && horizontal[1] && horizontal[2] || vertical[0] && vertical[1] && vertical[2]) {
        return true;
      }
    }
    if (gameBoard.getContent(0) == weapon && gameBoard.getContent(4) == weapon && gameBoard.getContent(8) == weapon ||
    gameBoard.getContent(2) == weapon && gameBoard.getContent(4) == weapon && gameBoard.getContent(6) == weapon){
      return true;
    }
    return false;
  }

  const tie = () => {
    for (let i = 0; i < 9; i++) {
      if (gameBoard.getContent(i) == '') {
        return false;
      }
    }
    return true;
  }

  const getWinnerName = () => {
    return nextPlayer.name;
  }

  const getScore = () => {
    return player1.getScore() + " : " + player2.getScore();
  }

  return {move, validMove, changePlayer, playGame, playerWon, tie, getWinnerName, getScore};
})();

const gameOver = (function () {
  const display = () => {
    document.querySelector(".board").style.cssText += 'pointer-events: none';

    div = document.createElement("div");
    div.classList.add("game_over");

    information = document.createElement("h1");
    information.classList.add("information");
    information.textContent = "Game over!"
    winner = document.createElement("h2");
    winner.classList.add("winner");

    if (gameController.playerWon()){
      winner.textContent = gameController.getWinnerName() + " is the winner!";
    } else {
      winner.textContent = "It's A Tie!";
    }

    score = document.createElement("h2");
    score.classList.add("score");
    score.textContent = " Score is " + gameController.getScore();
    button = document.createElement("button");
    button.classList.add("play_again_btn");
    button.textContent = "Play again?";

    div.appendChild(information);
    div.appendChild(winner);
    div.appendChild(score);
    div.appendChild(button);

    board.appendChild(div);

    button.addEventListener("click", (e) => {
      board.removeChild(div);
      board.style.cssText += 'pointer-events: all';
      gameBoard.clear();
    });
  }

  return {display};
})();

function createPlayer (name, weapon) {
  let score = 0;
  const getScore = () => score;
  const incrementScore = () => score++;

  return {name, weapon, getScore, incrementScore};
}

const board = document.querySelector(".board");

gameController.playGame();