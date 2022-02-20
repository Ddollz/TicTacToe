let playerx = true;
let playero = false;
let xScore = 0;
let oScore = 0;
let lineVertical = '';
let lineHorizontal = '';
let lineDiagonal = '';
let currentWinner = '';

let xCurScore = document.getElementById("scoreX");
let oCurScore = document.getElementById("scoreO");
let table = document.getElementById("grid");


let splash = document.getElementById("splash");
let text = document.getElementById("splash-text");

let grid = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
]

//?Hover Effects
function DataHoverIn(x) {
    no = x.getAttribute("cellNumber");

    if (playerx && checkCell(no)) {
        x.innerHTML = "";
        x.innerHTML += "X";
        x.style.opacity = "0.5";
        x.classList.add('hoveredText');

    }
    else if (playero && checkCell(no)) {
        x.innerHTML = "";
        x.innerHTML += "O";
        x.style.opacity = "0.5";
        x.classList.add('hoveredText');
    }
}
function DataHoverOut(x) {
    if (x.innerHTML != "" && checkCell(no)) {
        setTimeout(function () {
            x.classList.remove('hoveredText');
        }.bind(x), 100)
    }
}
//?Hover Effects End


//? Minimizing Player Selection
function cellSelect(x) {
    no = x.getAttribute("cellNumber");

    if (checkCell(no, check = true, x)) {
        playerx = !playerx;
        playero = !playero;
        gridCheck();
        frontGridCheck();
        runWindowReset();
        AImove();
    }

}

function gridCheck() {
    //? Check Vertical Cells
    for (i = 0; i < 3; i++) {
        switch (i) {
            case 0:
                lineVertical = grid[0].join('')
                break;
            case 1:
                lineVertical = grid[1].join('')
                break;
            case 2:
                lineVertical = grid[2].join('')
                break;
        }
        if (lineVertical == "XXX") {
            return "X"
        } if (lineVertical == "OOO") {
            return "O"
        }
    }

    //? Check Vertical Cells
    if(grid[0][0]==grid[1][0] && grid[0][0]==grid[2][0])return grid[0][0]
    else if(grid[0][1]==grid[1][1] && grid[0][1]==grid[2][1]) return grid[0][0]
    else if(grid[0][2]==grid[1][2] && grid[0][2]==grid[2][2]) return grid[0][0]
    

    //? Check Diagonal Cells
    lineDiagonal = ''
    lineDiagonal = lineDiagonal.concat(grid[0][0], grid[1][1], grid[2][2])

    if (lineDiagonal == "XXX") {
        return "X"
    } if (lineDiagonal == "OOO") {
        return "O"
    }

    lineDiagonal = ''
    lineDiagonal = lineDiagonal.concat(grid[0][2], grid[1][1], grid[2][0])

    if (lineDiagonal == "XXX") {
        return "X"
    } if (lineDiagonal == "OOO") {
        return "O"
    }

}

function checkDraw() {
    //? Check Tie
    let number = "123456789"
    let temp = true;
    for (let i = 0; i < grid.length; i++) {
        for (let o = 0; o < grid[i].length; o++) {
            if (number.includes(grid[i][o])) {
                temp = false;
                break;
            }
        }
    }
    if (temp == true) {
        return true
    } else {
        return false
    }
}

//! UI Reset
function runWindowReset() {
    let winner = gridCheck();
    if (winner) {
        if (winner == "X") {
            xScore += 1;
            xCurScore.innerHTML = xScore;
        } else if (winner == "O") {
            oScore += 1;
            oCurScore.innerHTML = oScore;
        }
        screenSplash(winner + " Wins!")
        // resetGrid();
    }
    
    else if (checkDraw()){
        screenSplash("Tie!")
        // resetGrid();
    }
}

function screenSplash(splashText){
    text.innerHTML = splashText;
    splash.classList.add('splash-block');
    splash.classList.add('active');
}

//! Reset Grid
function resetGrid() {
    grid = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
    ]

    playerx = true;
    playero = false;
    lineVertical = '';
    lineHorizontal = '';
    lineDiagonal = '';

    for (let i = 0; i < table.rows.length; i++) {
        for (let o = 0; o < table.rows[i].cells.length; o++) {
            table.rows[i].cells[o].classList.remove('hoveredText');
        }
    }
    AImove();

    splash.classList.remove('splash-block');
}

//? Selection cell Check
function checkCell(no, check = false, x = null) {
    // Find Cell 
    for (let i = 0; i < grid.length; i++) {
        for (let o = 0; o < grid[i].length; o++) {
            //Only Go through this if the cell is Empty and Cell is selected or Hovered
            if (no == grid[i][o] && grid[i][o] != "X" && grid[i][o] != "O") {
                //Check if Player Selected A Cell
                if (check == true) {
                    if (playerx && x.innerHTML != "O") {
                        grid[i][o] = "X";
                        return true
                    }
                    else if (playero && x.innerHTML != "X") {
                        grid[i][o] = "O";
                        return true
                    }
                }
                //Check if Player Hover A Cell
                else {
                    if (grid[i][o] != "X" && grid[i][o] != "O")
                        return true
                    else
                        return false
                }
            }
        }
    }
}


//? I just added this because of UI bug
function frontGridCheck() {
    let CellnumberTemp = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let o = 0; o < grid[i].length; o++) {
            CellnumberTemp += 1;
            if (CellnumberTemp != grid[i][o]) {
                if (grid[i][o] == 'X') {
                    table.rows[i].cells[o].classList.add('hoveredText');
                    table.rows[i].cells[o].innerHTML = "X";
                    table.rows[i].cells[o].style.opacity = "1";
                }
                if (grid[i][o] == 'O') {
                    table.rows[i].cells[o].classList.add('hoveredText');
                    table.rows[i].cells[o].innerHTML = "O";
                    table.rows[i].cells[o].style.opacity = "1";
                }
            }
        }
    }
}

//? AI(Maximizing Player) Move Insertion
function AIinsertMove(bestMove) {
    grid[bestMove[0]][bestMove[1]] = 'X'
    
    playerx = !playerx;
    playero = !playero;
    frontGridCheck();
    runWindowReset();
}

//? First Run through of Minimax Algorithim
function AImove() {
    let bestScore = Number.NEGATIVE_INFINITY;
    let bestMove;

    for (let i = 0; i < 3; i++) {
        for (let o = 0; o < 3; o++) {
            if (grid[i][o] != "X" && grid[i][o] != "O") {
                let temp = grid[i][o];
                grid[i][o] = 'X';
                //? First call of minimax
                let score = minimax(grid, 0, false);
                grid[i][o] = temp;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = [i, o];
                }
            }
        }
    }

    //? Insert the best move of AI after running minimax algorithm
    AIinsertMove(bestMove)
}

//? Minimax Algorithm
function minimax(grid, isMaximizing) {
    //? Minimax Algorithm Note:
    //? It's a decision rule that the computer(AI) will fight itself to
    //? gain minimize the possible loss for worst case scenario 



    //? This is the depth or terminal node it determines when the search loop ends
    if (gridCheck() == "X") return 10

    if (gridCheck() == "O") return -10
    

    if (checkDraw()) return 0
    //? End

    //? Check if the loop is the Maximizing player
    if (isMaximizing) {
        //? If Maximizing player the AI must:
        //? Start with the lowest value
        //? Find the Highest score / Best Move
        let bestScore = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < 3; i++) {
            for (let o = 0; o < 3; o++) {
                if (grid[i][o] != "X" && grid[i][o] != "O") {

                    let temp = grid[i][o];
                    grid[i][o] = 'X';
                    let score = minimax(grid, false);
                    grid[i][o] = temp;
                    if (score > bestScore) {
                        bestScore = score;
                    }

                }
            }
        }
        return bestScore
    } 
    else {
        //? Else Minimizing player the AI must:
        //? Start with the highest value 
        //? the AI must find the best way to minimize the lose
        //? Note: that this move temporary value for PLAYER(HUMAN) that the AI will fight 
        let bestScore = Number.POSITIVE_INFINITY;
        for (let i = 0; i < 3; i++) {
            for (let o = 0; o < 3; o++) {
                if (grid[i][o] != "X" && grid[i][o] != "O") {

                    let temp = grid[i][o];
                    grid[i][o] = 'O';
                    let score = minimax(grid, true);
                    grid[i][o] = temp;
                    if (score < bestScore) {
                        bestScore = score;
                    }
                }
            }
        }
        return bestScore
    }
}

//? Player(AI) first move
AImove();