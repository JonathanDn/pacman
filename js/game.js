'use strict';


// TODOS
// When all foods are collected - game done
// cherry - intervalCherry (sets a timeout to reemove the cherry)
// Bonus: next level


var WALL    = '#';
var FOOD    = '.';
var EMPTY   = ' ';

var gBoard;

// added this to check if win game 1. total cell counter 2. total wall counter 3. pacman & gate empty cells(-2)
var gTotalCellCounter = 0;
var gTotalWallsCounter = 0;
var gFoodCounter =  -2;
console.log('gFoodCounter: ', gFoodCounter);


var gState = {
  score: 0,
  isGameDone : false
};


function init() {
  // handleUserPref();
  
  gBoard = buildBoard();  
  
  
  printMat(gBoard, '.boardContainer');
  // check if there's walls in the printed game board --> works
  //
  var cells = document.querySelectorAll('.cell');
  console.log('cells: ', cells);
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].innerText === '#') {
      cells[i].innerText = ' ';
      cells[i].classList.add('wall');
    }
    if (cells[i].innerText === '.') {
      cells[i].innerText = ' ';
      cells[i].classList.add('food')
    }
    if (cells[i].innerText === 'ᗤ') {
      // cells[i].innerText = ' ';
      cells[i].classList.add('pacman')
    }
    if (cells[i].innerText === 'ᗤ') {
      // cells[i].innerText = ' ';
      cells[i].classList.add('pacman')
      // console.log('gPacman location: i:', gPacman.location.i, 'j: ', gPacman.location.j );
      // console.log('.cell'+ gPacman.location.i + '-' + gPacman.location.j);
      
      // get pacman element
      var elPacman = document.querySelector('.cell' +  gPacman.location.i +'-' +  gPacman.location.j);
      // replace him with empty.
      elPacman.innerText = ' ';
      // console.log('elPacman: ', elPacman);
    }
    if (cells[i].innerText === 'ᗣ') {
      cells[i].innerText = ' ';
      cells[i].classList.add('ghost')
    }

  }
  
  console.table(gBoard);
  
}



function buildBoard() {
  var SIZE = 8;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      
        board[i][j] = FOOD;
        gTotalCellCounter++;
        console.log('gTotalCellCounter: ', gTotalCellCounter);
        
        
      
      
        if (i === 0 || i === SIZE-1 ||
            j === 0 || j === SIZE-1 ||
            (j == 3 && i > 4 && i < SIZE-2)  )  {
              
          board[i][j] = WALL;
          gTotalWallsCounter++;
          console.log('gTotalWallsCounter: ', gTotalWallsCounter);
          
              
        }
    } 
  }
  // TOTAL AMOUNT OF FOOD TO EAT TO WIN game
  gFoodCounter += gTotalCellCounter - gTotalWallsCounter;
  console.log('gFoodCounter: ', gFoodCounter);
  
  createPacman(board);
  createGhosts(board);
  
   

  return board;
}




function checkEngage(cell, opponent) {  
  var isGameOver = false;
  if (cell === opponent) {
    if (gPacman.isSuper) {
      console.log('Ghost is dead');
    } else {
      clearInterval(gIntervalGhosts);
      gState.isGameDone  = true;
      alert('Game Over!');
      isGameOver = true;
    }
  }
  return isGameOver;
}




// this function updates both the model and the dom for the score
function updateScore(value) {
    gState.score += value;
    document.querySelector('header > h3 > span').innerText = gState.score;
    // if you eat all food (foodcounter) you win
    if (gState.score === gFoodCounter) {
      alert('You Win!');      
    }
}

function renderCell(location, value) {
  var cellSelector = '.cell' + location.i + '-' + location.j;
  var elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}




