var gPacman; 
var PACMAN  = 'ᗤ';
var pacmanMunch = new Audio ('sound/pacman_chomp.mp3');

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  }; 
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (gState.isGameDone) return;
  var nextLocation = {
    i: gPacman.location.i, 
    j: gPacman.location.j
  };
  pacmanMunch.play();
  switch (eventKeyboard.code) {
    case 'ArrowUp': 
      nextLocation.i--;
      break;
    case 'ArrowDown': 
      nextLocation.i++;
      break;
    case 'ArrowLeft': 
      nextLocation.j--;
      break; 
    case 'ArrowRight': 
      nextLocation.j++;
      break;           
  }
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  if (nextCell === WALL) return;
  if (nextCell === FOOD) updateScore(1);
  var isGameOver = checkEngage(nextCell, GHOST);
  if (isGameOver) return;
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  if (gBoard[gPacman.location.i][gPacman.location.j] === ' ') {
    var elPrevCell = document.querySelector('.cell' +  gPacman.location.i +'-' +  gPacman.location.j);
    elPrevCell.classList.remove('food');
    elPrevCell.classList.remove('pacman');
    var elNextCell = document.querySelector('.cell' + nextLocation.i + '-' + nextLocation.j);
    elNextCell.classList.add('pacman');
  }
  renderCell(gPacman.location, EMPTY);
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  renderCell(gPacman.location, PACMAN);
  elNextCell.innerText = ' ';
}