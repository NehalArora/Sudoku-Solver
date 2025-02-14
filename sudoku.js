var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function SudokuSolver(board, i, j, n) {
    // If we reach the end of the board
    if (i == n) {
        FillBoard(board);
        return true;
    }
    
    // If we reach the end of the row, move to the next row
    if (j == n) {
        return SudokuSolver(board, i + 1, 0, n);
    }
    
    // If cell is already filled, move to the next column
    if (board[i][j] !== 0) {
        return SudokuSolver(board, i, j + 1, n);
    }
    
    // Try placing numbers from 1 to 9
    for (let num = 1; num <= 9; num++) {
        if (isSafe(board, i, j, num, n)) {
            board[i][j] = num; // Place the number
            if (SudokuSolver(board, i, j + 1, n)) {
                return true; // If solution is found, return true
            }
            board[i][j] = 0; // Backtrack if needed
        }
    }
    
    return false; // If no number fits, return false
}

function isSafe(board, row, col, num, n) {
    // Check row and column
    for (let x = 0; x < n; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }
    
    // Check 3x3 grid
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[startRow + r][startCol + c] === num) {
                return false;
            }
        }
    }
    
    return true;
}
