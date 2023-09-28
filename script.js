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
      img.src = image_crest;
      img.setAttribute('width', '100%');
      img.setAttribute('height', '100%');
      space.appendChild(img);
      space.classList.add("grid_space");
      space.id = `grid-${i}`;
      // space.innerText = '';
      gameBoard.push(space);
      grid.appendChild(space);
    }
  };

  const reset = function () {
    board.forEach(cell => {
      cell.dataset.player = '';
      cell.removeChild(cell.firstChild);
      const img = document.createElement('img');
      img.src = image_crest;
      img.setAttribute('width', '100%');
      img.setAttribute('height', '100%');
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


function  playerFactory(name, pic) {
  const play = function (e) {
    if (e.target.nodeName.toLowerCase() === 'div') {
      const img = e.target.querySelector('img');
      if (img.src.length === 0) {
        img.src = pic;
        return true;
      }
    }else if (e.target.nodeName.toLowerCase() === 'img') {
      return false;
    }

  }
  return {
    play,
    name,
    pic
  }
}  


const Game = (() => {
  let turn = Player.First;
  const totalRounds = 8;
  let round = 0;
  let p1 = playerFactory('player 1', image_ron);
  let p2 = playerFactory('player 2', image_hermione);
  Gameboard.init(p1, p2, round);
  let gameBoard = GameBoard.gameBoard;

  function play(e) {
    if (round === totalRounds) {
      
    }
  }

  gameBoard.forEach(space => {
    space.addEventListener('click', play)
  })


})();




// ron.addEventListener("click", createPlayer1("ron"));
// hermione.addEventListener("click", createPlayer1("hermione"));






