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


//? Player Selection
function cellSelect(x) {
    no = x.getAttribute("cellNumber");

    if (checkCell(no, check = true, x)) {
        playerx = !playerx;
        playero = !playero;
        gridCheck();
        frontGridCheck();
    }
    runWindowReset();

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
    if (grid[0][0] == grid[1][0] && grid[0][0] == grid[2][0]) return grid[0][0]
    else if (grid[0][1] == grid[1][1] && grid[0][1] == grid[2][1]) return grid[0][0]
    else if (grid[0][2] == grid[1][2] && grid[0][2] == grid[2][2]) return grid[0][0]


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
        resetGrid();
    }

    if (checkDraw()) {
        screenSplash("Tie!")
        resetGrid();
    }
}

function screenSplash(splashText) {
    let splash = document.getElementById("splash");
    let text = document.getElementById("splash-text");
    text.innerHTML = splashText;
    splash.classList.add('splash-block');
    setTimeout(function () {
        splash.classList.remove('splash-block');
    }, 1000)
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

}

//? Check if Already Selected
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



function frontGridCheck() {
    let tests = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let o = 0; o < grid[i].length; o++) {
            tests += 1;
            if (tests != grid[i][o]) {
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