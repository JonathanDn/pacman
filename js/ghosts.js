var GHOST  = 'ᗣ';

var gIntervalGhosts;
var gGhosts;

function createGhosts(board) {
  gGhosts = [];
  createGhost(board);
  createGhost(board); 
  gIntervalGhosts = setInterval(function moveGhosts(){
    gGhosts.forEach(function moveGhost(ghost) {
        var nextLocation = {
            i: ghost.location.i + getRandomIntInclusive(-1, 1),
            j: ghost.location.j + getRandomIntInclusive(-1, 1)
        }
        if (board[nextLocation.i][nextLocation.j] === WALL) return;
        if (board[nextLocation.i][nextLocation.j] === GHOST) return;  
        var isGameOver = checkEngage(board[nextLocation.i][nextLocation.j], PACMAN);

        // set back what we stepped on.
        board[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        // get the previous cell location of ghost.
        var elGhostPrevCell = document.querySelector('.cell' +  ghost.location.i +'-' +  ghost.location.j);
        // remove it's class ghost --> remove ghost picture from previous cell.
        elGhostPrevCell.classList.remove('ghost1');
        // hiding the . food the monsters had in their previous cell.
        if (ghost.currCellContent === FOOD) ghost.currCellContent = ' ';
        renderCell(ghost.location, ghost.currCellContent);
        ghost.location = nextLocation;
        // keep the contnet of the cell we are going to
        ghost.currCellContent = board[ghost.location.i][ghost.location.j];
        // move the ghost model and update dom
        board[ghost.location.i][ghost.location.j] = GHOST;
        renderCell(ghost.location, GHOST);
        // this is the next cells the ghosts are moving too, printing their elements each time.
        var elGhostNextCell = document.querySelector('.cell' + nextLocation.i + '-' + nextLocation.j);
        elGhostNextCell.innerText = ' ';
        elGhostNextCell.classList.add('ghost1') 
     });  
  }, 1000);
}

function createGhost(board) {
    var ghost = {
        color: getRandomColor(),
        location: {
        i: 3,
        j: 3
        },
        currCellContent: FOOD  
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}