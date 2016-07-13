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
        
        
        
        // console.log('nextLocation', nextLocation);
        
        if (board[nextLocation.i][nextLocation.j] === WALL) return;
        if (board[nextLocation.i][nextLocation.j] === GHOST) return;
        
        var isGameOver = checkEngage(board[nextLocation.i][nextLocation.j], PACMAN);
        if (isGameOver) {
        
        }
        
        // set back what we stepped on.
        board[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        
        // console.log('.cell' +  ghost.location.i +'-' +  ghost.location.j);
        
        // 1. get ghost prev cell
        // 2. remove it's class ghost1 --> remove picture of ghost.
        
        // get the previous cell location of ghost.
        var elGhostPrevCell = document.querySelector('.cell' +  ghost.location.i +'-' +  ghost.location.j);
        // check that element is grabbed correctly
        console.log('elGhostPrevCell: ', elGhostPrevCell);
        // remove it's class ghost 1 --> remove ghost picture from previous cell.
        elGhostPrevCell.classList.remove('ghost1');
        
        // hiding the . food the monsters had in their previous cell.
        if (ghost.currCellContent === FOOD) {
            ghost.currCellContent = ' ';
        }
        
        renderCell(ghost.location, ghost.currCellContent);
        
        // move the ghost
        ghost.location = nextLocation;
        
        // keep the contnet of the cell we are going to
        ghost.currCellContent = board[ghost.location.i][ghost.location.j];
        
        // move the ghost model and update dom
        board[ghost.location.i][ghost.location.j] = GHOST;
        renderCell(ghost.location, GHOST);
        
        // 1. get elGhostNextCell
        // 2. change it's inner text.
        
        // the next ghost location class(serves as id)        
        console.log('.cell' + nextLocation.i + '-' + nextLocation.j);
        
        // this is the next cells the ghosts are moving too, printing their elements each time.
        var elGhostNextCell = document.querySelector('.cell' + nextLocation.i + '-' + nextLocation.j);
        console.log('elGhostNextCell: ', elGhostNextCell);
        
        
        //activate later
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