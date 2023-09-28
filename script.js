// const ron = document.getElementById("#ron");
// const hermione = document.getElementById("#hermione");
const image_ron = document.createElement("img").src="images/Ron_Weasley_poster.jpg";
const image_hermione = document.createElement("img").src="images/Hermione_Granger_poster.jpg";
const image_crest = document.createElement('img').src="images/Crest.jpg";

const Player = (() => {
  return{
    First: 1,
    Second: 2,
    None: 0
  }
})();

const Gameboard = (() => {
  let gameBoard = [];
  const grid = document.getElementById("game_board");

  const init = function () {
    for (let i = 0; i < 9; i++) {
      const space = document.createElement('div');
      const img = document.createElement('img');
      img.classList.add('available')
      space.appendChild(img);
      space.classList.add('gridSpace');
      space.id = `grid-${i}`;
      space.dataset.player = '';
      gameBoard.push(space);
      grid.appendChild(space);
    }
  };

  const reset = function () {
    gameBoard.forEach(cell => {
      cell.dataset.player = '';
      cell.removeChild(cell.firstChild);
      const img = document.createElement('img');
      cell.appendChild(img);
    })
  }
    return {
      grid: grid,
      gameBoard,
      init,
      reset
    };

})();

const modal = (() => {
  let modalElement = document.getElementById('modal');
  let winMessageElement = document.getElementById('win-message');
  let contentPic = document.getElementById('player-icon');
  let closeModalElement = document.getElementById('close');
  const bodyElement = document.querySelector('body');
  closeModalElement.addEventListener('click', () => {
    displayNo();
  })

  function displayYes(player) {
    bodyElement.style.overflow = 'hidden';
    modalElement.style.display = 'flex';
    if(player === Player.None) {
      winMessageElement.textContent = "It's a tie! That's not very magical."
      return;
    }
    winMessageElement.textContent = player.winMessage;
    contentPic.src = player.pic;
    
  }

  function displayNo() {
    bodyElement.style.overflow = 'auto';
    modalElement.style.display = 'none';
    winMessageElement.textContent = '';
    contentPic.src = '';
  }

  return {
    displayYes,
    displayNo
  }
})();


function  playerFactory(name, pic, winMessage) {
  const play = function (e) {
    if (e.target.nodeName.toLowerCase() === 'div') {
      const img = e.target.querySelector('img');
      if (img.src.length === 0) {
        img.src = pic;
        img.setAttribute('width', '100%');
        img.setAttribute('height', '100%');
  
        return true;
      }
    } else if (e.target.nodeName.toLowerCase() === 'img') {
      return false
    }

  }
  return {
    play,
    name,
    pic, 
    winMessage
  }
}  


const Game = (() => {
  let turn = Player.First;
  const totalRounds = 8;
  let round = 0;
  let p1 = playerFactory('player 1', image_ron, "That's wizard's tic tac toe!");
  let p2 = playerFactory('player 2', image_hermione, "Looks like you need to study more.");
  Gameboard.init(p1, p2, round);
  let gameBoard = Gameboard.gameBoard;

  function play(e) {

    if (round === totalRounds) {
      modal.displayYes(Player.None);
    }

    switch (turn) {
      case Player.First:
        if (p1.play(e)) {
          turn = Player.Second;
          e.target.dataset.player = Player.First;
          round++;
          if (parseInt(checkWinner()) !== Player.None) {
            modal.displayYes(p1);
          }
        }
        break;
      case Player.Second:
        if (p2.play(e)) {
          turn = Player.First;
          e.target.dataset.player = Player.Second;
          round++;
          if (parseInt(checkWinner()) !== Player.None) {
            modal.displayYes(p2);
          }
        }
        break;
    }
  };

  function reset() {
    turn = Player.First;
    round = 0;
    Gameboard.reset();
  }
  document.getElementById('close').addEventListener('click', reset);

  function checkWinner() {
    let winner = Player.None;
    for (let i = 0; i < 9; i = i + 3) {
      if (gameBoard[i].dataset.player) {
        if ((gameBoard[i].dataset.player === gameBoard[i + 1].dataset.player) && (gameBoard[i + 1].dataset.player === gameBoard[i + 2].dataset.player)) {
          winner = gameBoard[i].dataset.player;
          return winner;
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      if (gameBoard[i].dataset.player) {
        if ((gameBoard[i].dataset.player === gameBoard[i + 3].dataset.player) && (gameBoard[i + 3].dataset.player === gameBoard[i + 6].dataset.player)) {
          winner = gameBoard[i].dataset.player;
          return winner;
        }
      }
    }
    if (gameBoard[0].dataset.player) {
      if ((gameBoard[0].dataset.player === gameBoard[4].dataset.player) && (gameBoard[4].dataset.player === gameBoard[8].dataset.player)) {
        winner = gameBoard[0].dataset.player;
        return winner;
      }
    }
    if (gameBoard[2].dataset.player) {
      if ((gameBoard[2].dataset.player === gameBoard[4].dataset.player) && (gameBoard[4].dataset.player === gameBoard[6].dataset.player)) {
        winner = gameBoard[2].dataset.player;
        return winner;
      }
    }

    return winner;
  }

  gameBoard.forEach(space => {
    space.addEventListener('click', play)
  })


})();




// ron.addEventListener("click", createPlayer1("ron"));
// hermione.addEventListener("click", createPlayer1("hermione"));






