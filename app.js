

const statusDisplay = document.querySelector('.game-status')
//if the game is still on
let gameActive = true
//the game starts with X on the move
let currentPlayer = 'X'
//the positions that are played
let gameStatus = ['','','','','','','','','']
//function expressions for the current state of the game
const winningMessage = () => `Player ${currentPlayer} has won!`
const drawMessage = () => `It's a draw`
const currentPlayerTurn = () => `It's ${currentPlayer} turn`

//display the game status on web
statusDisplay.innerHTML = currentPlayerTurn();

//positions that are winning
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//write in array the position and player played
//display it on the grid
function squarePlayed(clickedSquare, clickedSquareIndex){
    gameStatus[clickedSquareIndex] = currentPlayer
    clickedSquare.innerHTML = currentPlayer
}

//change the player from X to O and O to X
function playerChange(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    statusDisplay.innerHTML = currentPlayerTurn();
}

//check for the win
function resultValidation(){
    //check if is a win on the board
    let roundWon = false
    for(let i = 0; i < 8; i++){
        const winCondition = winningConditions[i]
        //check if it matches the winning conditions
        let a = gameStatus[winCondition[0]]
        let b = gameStatus[winCondition[1]]
        let c = gameStatus[winCondition[2]]
        //if its empty just continue
        if(a === '' || b === '' || c === ""){
            continue;
        }

        if(a === b && b === c){
            roundWon = true
            break
        }
    }

    //if it's a win than the game stops
    if(roundWon === true){
        statusDisplay.innerHTML = winningMessage()
        gameActive = false
        return
    }

    //check if the array of position is full
    //if its true then the game is a draw
    let roundDraw = gameStatus.includes("")
    if(roundDraw === false){
        statusDisplay.innerHTML = drawMessage()
        gameActive = false
        return
    }

    playerChange()
}

function squareClick(clickedSquareEvent){
    //get the square and index od the one just clicked
    const clickedSquare = clickedSquareEvent.target
    const clickedSquareIndex = parseInt(clickedSquare.getAttribute('data-cell-index'))

    //if the game is not active or the array is full we can't click anymore
    if(gameStatus[clickedSquareIndex] !== '' || !gameActive ){
        return
    }

    //if the game is still playing we call the function to write in the array and display it
    squarePlayed(clickedSquare, clickedSquareIndex)
    //check the status: who wins or if it s a draw
    resultValidation()
}

//function to reset the game
function gameRestart(){
    gameActive = true
    currentPlayer = 'X'
    gameStatus = ['','','','','','','','','']
    statusDisplay.innerHTML = currentPlayerTurn();
    //reset the grid
    document.querySelectorAll('.square').forEach(cell => cell.innerHTML = '')
}

//enable clicking on the grid's square
document.querySelectorAll('.square').forEach(cell => cell.addEventListener('click', squareClick));

//enable clicking on the reset button
document.querySelector('.game-restart').addEventListener('click', gameRestart);

