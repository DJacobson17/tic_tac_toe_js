const Gameboard = (() => {
  let board = [];
  const grid = document.getElementById("game_board");
  
  const init = function () {
    let counter = 0;
    for (let i = 0; i < 9; i++) {
      const space = document.createElement('div');
      const img = document.createElement('img');
      space.appendChild(img);
      space.id = `grid-${counter}`;
      // space.dataset.player = '';
      counter++;
      board.push(space);
      grid.appendChild(space);
    }
  };
    return {
      grid: grid,
      board,
      init
    };

  })();

Game = Gameboard.init();

