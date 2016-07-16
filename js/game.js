'use strict';

var WALL    = '#';
var FOOD    = '.';
var EMPTY   = ' ';

var gBoard;
var gTotalCellCounter = 0;
var gTotalWallsCounter = 0;
var gFoodCounter =  -2;
var gState = {
  score: 0,
  isGameDone : false
};

function init() {
  gBoard = buildBoard();  
  printMat(gBoard, '.boardContainer');
  var cells = document.querySelectorAll('.cell');
  console.log('cells: ', cells);
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].innerText === '#') {
      cells[i].innerText = ' ';
      cells[i].classList.add('wall');
    }
    if (cells[i].innerText === '.') {
      cells[i].innerText = ' ';
      cells[i].classList.add('food');
    }
    if (cells[i].innerText === 'ᗤ') cells[i].classList.add('pacman');
    if (cells[i].innerText === 'ᗤ') {
      cells[i].classList.add('pacman')
      var elPacman = document.querySelector('.cell' +  gPacman.location.i +'-' +  gPacman.location.j);
      elPacman.innerText = ' ';
    }
    if (cells[i].innerText === 'ᗣ') {
      cells[i].innerText = ' ';
      cells[i].classList.add('ghost')
    }
  }
}

function buildBoard() {
  var SIZE = 8;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
        board[i][j] = FOOD;
        gTotalCellCounter++;      
        if  (i === 0 || i === SIZE-1 ||
            j === 0 || j === SIZE-1 ||
            (j == 3 && i > 4 && i < SIZE-2)  )  {
          board[i][j] = WALL;
          gTotalWallsCounter++;
        }
    } 
  }
  gFoodCounter += gTotalCellCounter - gTotalWallsCounter;
  createPacman(board);
  createGhosts(board);
  return board;
}

function checkEngage(cell, opponent) {  
  var isGameOver = false;
  if (cell === opponent) {
    if (!gPacman.isSuper) {
      clearInterval(gIntervalGhosts);
      gState.isGameDone  = true;
      alert('Game Over!');
      isGameOver = true;
    }
  }
  return isGameOver;
}

function updateScore(value) {
    gState.score += value;
    document.querySelector('header > h3 > span').innerText = gState.score;
    if (gState.score === gFoodCounter) alert('You Win!');      
}

function renderCell(location, value) {
  var cellSelector = '.cell' + location.i + '-' + location.j;
  var elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}