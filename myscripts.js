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
    const div = document.getElementById(index);
    div.textContent = char;
    div.classList.add("animate");
    div.addEventListener("animationend", () => {
      div.classList.remove("animate");
    })
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

  const winAnimate = () => {
    indexes = gameController.getWinIndexes();
    for (let i = 0; i < 3; i++) {
      const div = document.getElementById(indexes[i]);
      div.classList.add("animate_win");
      div.addEventListener("animationend", () => {
        div.classList.remove("animate_win");
      })
    }
  }

  return {updateBoard, updateSquare, getContent, clear, winAnimate};
})();

const gameController = (function () {
  const player1 = createPlayer('Player1', 'x');
  const player2 = createPlayer('Player2', 'o');
  
  let nextPlayer = player1;
  let startingPlayer = player1;

  const playGame = () => {
    document.querySelector(".player1").classList.add("show_turn");
    board.addEventListener("click", (e) => {
      let index = e.target.id;
      if (gameController.validMove(index)) {
        gameController.move(index);
        
        if (gameController.playerWon() || gameController.tie()) {
          if (gameController.playerWon()) {
            nextPlayer.incrementScore();
            gameController.updateScore();
            gameBoard.winAnimate();
          }
          gameController.stopShowingTurn();
          gameOver.display();
        } else {
          gameController.changePlayer();
        }
      }
    });
  }

  const changeStartingPlayer = () => {
    if (startingPlayer == player1) {
      startingPlayer = player2;
      nextPlayer = player2;
      document.querySelector(".player2").classList.add("show_turn");
    } else {
      startingPlayer = player1;
      nextPlayer = player1;
      document.querySelector(".player1").classList.add("show_turn");
    }
  }

  const move = (index) => {
    gameBoard.updateSquare(index, nextPlayer.weapon);
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
      document.querySelector(".player1").classList.remove("show_turn");
      document.querySelector(".player2").classList.add("show_turn");
    } else {
      document.querySelector(".player2").classList.remove("show_turn");
      document.querySelector(".player1").classList.add("show_turn");
      nextPlayer = player1;
    }
  }

  const stopShowingTurn = () => {
    if (nextPlayer == player1){
      document.querySelector(".player1").classList.remove("show_turn");
    } else {
      document.querySelector(".player2").classList.remove("show_turn");
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

  const updateScore = () => {
    const score = document.querySelector(".score");
    score.textContent = player1.getScore() + ":" + player2.getScore();
  }

  const getWinIndexes = () => {
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

      if (horizontal[0] && horizontal[1] && horizontal[2]) {
        return [i - 1, i - 2, i - 3];
      } else if (vertical[0] && vertical[1] && vertical[2]) {
        return [j - 3, j - 6, j - 9];
      }
    }
    if (gameBoard.getContent(0) == weapon && gameBoard.getContent(4) == weapon && gameBoard.getContent(8) == weapon){
      return [0, 4, 8];
    } else if (gameBoard.getContent(2) == weapon && gameBoard.getContent(4) == weapon && gameBoard.getContent(6) == weapon) {
      return [2, 4, 6];
    }
  }

  return {move, validMove, changePlayer, playGame, playerWon, tie, getWinnerName, getScore, updateScore, getWinIndexes, stopShowingTurn, changeStartingPlayer};
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
      gameController.changeStartingPlayer();
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