var gPacman; 
var PACMAN  = 'ᗤ';
var pacmanMunch = new Audio ('sound/pacman_chomp.mp3');

// trying to use Image saved word and failed.

// var myPacman = new Image(44, 44);
// myPacman.src = 'img/pacman.jpg';
// console.log('myPacman: ', myPacman);
// document.createElement('myPacman');



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
  // play munch sound now, if game done stop
  pacmanMunch.play();
  // Where the pacman is CURRENTLY AT:
  console.log('gPacman.location: ', gPacman.location);
  switch (eventKeyboard.code) {
    
    case 'ArrowUp': 
      //console.log('Arrow Up!');
      nextLocation.i--;
      break;
    case 'ArrowDown': 
      //console.log('Arrow Down!');
      nextLocation.i++;
      break;
    case 'ArrowLeft': 
      //console.log('Arrow Left!');
      nextLocation.j--;
      break; 
    case 'ArrowRight': 
      //console.log('Arrow Right!');
      nextLocation.j++;
      break;           
    
  }
  
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('Heading: row:', newLocation.i , ' col: ', newLocation.j );
  // console.log('Whats there:', gBoard[newLocation.i][newLocation.j]);
  
  // this is where the pacman is GOING TO: 
  console.log('next location is at:  i:', nextLocation.i, 'j: ', nextLocation.j);
  
  // hitting a wall, not moving anywhere
  if (nextCell === WALL) return;

  // hitting FOOD
  if (nextCell === FOOD) {
    updateScore(1);
  } 
  
  
  var isGameOver = checkEngage(nextCell, GHOST);
  if (isGameOver) return;
  
  // update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  
  // if the previous cell was food --> clear it.
  // remove that cells food class.
  // classlist.remove('food');
  console.log('gBoard[gPacman.location.i][gPacman.location.j]: ', gBoard[gPacman.location.i][gPacman.location.j]);
  
  if (gBoard[gPacman.location.i][gPacman.location.j] === ' ') {
    // print to see the previous cell last location --> and than it's unique class selector
    console.log('previous cell: ', 'cell'+  gPacman.location.i +'-' +  gPacman.location.j);
    
    // catched the previous cell element!!! Weee (I used a semi js and semi html to get the unique location cell'i'-'j')
    var elPrevCell = document.querySelector('.cell' +  gPacman.location.i +'-' +  gPacman.location.j);
    console.log('elPrevCell: ', elPrevCell);
 
    // remove it's food class to make it an empty cell.
    elPrevCell.classList.remove('food');
    
    elPrevCell.classList.add('empty');
    
    
    // remove class packman if existed on the previous cell.
    elPrevCell.classList.remove('pacman');
    
    // now add the class pacman to the next cell.
    console.log('Next cell: ', 'cell' + nextLocation.i + '-' + nextLocation.j);
    
    var elNextCell = document.querySelector('.cell' + nextLocation.i + '-' + nextLocation.j);
    console.log('elNextCell: ', elNextCell);
    
    elNextCell.classList.add('pacman');
    
    

  }
  // render updated model to the DOM
  renderCell(gPacman.location, EMPTY);
  
  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  
  
  
  // render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
  
  
  // AFTER done rendering pacman, when moving to the next step --> delete pacman icon.
  elNextCell.innerText = ' ';
}
