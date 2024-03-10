var gameBoard = ["-", "-", "-", 
                 "-", "-", "-", 
                 "-", "-", "-"];
var currentPlayer  = "X";
var winner = null;
var gameRunning = true;
call();

// The game board will print with all the spaces originally empty.
function printBoard(gameBoard){
    console.log(gameBoard[0] + " | " + gameBoard[1] + " | " + gameBoard[2]);
    console.log("---------");
    console.log(gameBoard[3] + " | " + gameBoard[4] + " | " + gameBoard[5]);
    console.log("---------");
    console.log(gameBoard[6] + " | " + gameBoard[7] + " | " + gameBoard[8]);
}

// The program continues to check for a winner and for both the user's and computer's inputs.
function call(){
    while (gameRunning == true) {
        printBoard(gameBoard);
        playerInput(gameBoard);
        checkTiles();
        checkWin();
        checkTie(gameBoard);
        switchPlayer();
        computerInput(gameBoard);
        checkTiles();
        checkWin();
        checkTie(gameBoard);
    }
}

// The user will place an X on the space they want on the board, corresponding to the number they input.
function playerInput(gameBoard){
    console.log("");
    var inp = parseInt(prompt("Please enter a number from 1 to 9: "));
    console.log("");
    if (inp >= 1 && inp <= 9 && gameBoard[inp-1] == "-") {
        gameBoard[inp-1] = currentPlayer;
    } else if (inp < 1 || inp > 9) {
        console.log("");
        console.log("That space does not exist on the board.");
        console.log("");
    } else {
        console.log("");
        console.log("That space is invalid or is already occupied.");
        console.log("");
    }
}

// The rows in the game board will be checked for a winner.
function checkRow(gameBoard){
    if (gameBoard[0] == gameBoard[1] && gameBoard[0] == gameBoard[2] && gameBoard[0] != "-") {
        winner = gameBoard[0];
    } else if (gameBoard[3] == gameBoard[4] && gameBoard[3] == gameBoard[5] && gameBoard[3] != "-") {
        winner = gameBoard[3];
    } else if (gameBoard[6] == gameBoard[7] && gameBoard[6] == gameBoard[8] && gameBoard[6] != "-") {
        winner = gameBoard[6];
    } else {
        winner = null
    }
}

// The columns in the game board will be checked for a winner.
function checkColumn(gameBoard){
    if (gameBoard[0] == gameBoard[3] && gameBoard[0] == gameBoard[6] && gameBoard[0] != "-") {
        winner = gameBoard[0];
    } else if (gameBoard[1] == gameBoard[4] && gameBoard[1] == gameBoard[7] && gameBoard[1] != "-") {
        winner = gameBoard[1];
    } else if (gameBoard[2] == gameBoard[5] && gameBoard[2] == gameBoard[8] && gameBoard[2] != "-") {
        winner = gameBoard[2];
    } else {
        winner = null
    }
}

// The diagonals in the game board will be checked for a winner.
function checkDiagonal(gameBoard){
    if (gameBoard[0] == gameBoard[4] && gameBoard[0] == gameBoard[8] && gameBoard[0] != "-") {
        winner = gameBoard[0];
    } else if (gameBoard[2] == gameBoard[4] && gameBoard[2] == gameBoard[6] && gameBoard[2] != "-") {
        winner = gameBoard[2];
    } else {
        winner = null
    }
}

// If there is a tie, the game will end.
function checkTie(gameBoard){
    if (!gameBoard.includes("-")) {
        printBoard(gameBoard);
        console.log("");
        console.log("It is a tie!");
        console.log("");
        gameRunning = false;
        result();
    }
}

// If there is a winner, the game will end.
function checkWin(){
    if (winner != null){
        printBoard(gameBoard);
        console.log("");
        console.log(`The winner is ${winner}!`);
        console.log("");
        gameRunning = false;
        result();
    }
}

// The program will use the other three functions to find a winner.
function checkTiles(){
    checkRow(gameBoard);
    checkColumn(gameBoard);
    checkDiagonal(gameBoard);
}

// The user's and computer's turns will switch after a move was made.
function switchPlayer(){
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
}

// The computer will make a random move against the user.
function computerInput(gameBoard) {
    while (currentPlayer == "O") {
        var position = Math.floor(Math.random() * 9);
        if (gameBoard[position] == "-") {
            gameBoard[position] = "O";
            switchPlayer();
        }
    }
}

// The game will restart and the user will be able to play against the computer again.
function restart(){
    for(var number = 0; number < gameBoard.length; number++) {
        gameBoard[number] = "-";
    }
    currentPlayer  = "X";
    winner = null;
    gameRunning = true;
    number = 0;
    console.log("");
    call();
}

// The user can choose to restart the game or to exit the program.
function result(){
    while (gameRunning == false) {
        console.log("Do you want to play again?");
        var answer = prompt("Please answer with (yes/no): ");
        if (answer == "yes") {
            restart();
        } else if (answer == "no") {
            break
        } else if (answer != "yes" || answer != "no") {
            console.log("");
            console.log("Please respond with (yes/no).");
            console.log("");
        }
    }
}