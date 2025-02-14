var arr = [[], [], [], [], [], [], [], [], []];

// Initialize the grid elements
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);
    }
}

var board = [[], [], [], [], [], [], [], [], []];

// Function to fill the board with numbers
function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] !== 0) {
                arr[i][j].innerText = board[i][j];
            } else {
                arr[i][j].innerText = '';
            }
        }
    }
}

// Function to capture the user's puzzle input
function capturePuzzle() {
    let puzzle = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let cell = arr[i][j].innerText;
            row.push(cell ? parseInt(cell) : 0); // Convert to number or 0 if empty
        }
        puzzle.push(row);
    }
    return puzzle;
}

// Function to validate the puzzle
function validatePuzzle(puzzle) {
    // Check rows and columns for duplicates
    for (let i = 0; i < 9; i++) {
        let rowSet = new Set();
        let colSet = new Set();
        for (let j = 0; j < 9; j++) {
            // Validate rows
            if (puzzle[i][j] !== 0) {
                if (rowSet.has(puzzle[i][j])) return false;
                rowSet.add(puzzle[i][j]);
            }
            // Validate columns
            if (puzzle[j][i] !== 0) {
                if (colSet.has(puzzle[j][i])) return false;
                colSet.add(puzzle[j][i]);
            }
        }
    }

    // Check 3x3 boxes for duplicates
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            let boxSet = new Set();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let num = puzzle[boxRow * 3 + i][boxCol * 3 + j];
                    if (num !== 0) {
                        if (boxSet.has(num)) return false;
                        boxSet.add(num);
                    }
                }
            }
        }
    }

    return true; // Puzzle is valid
}

// Solve button event listener
document.getElementById("SolvePuzzle").addEventListener("click", function() {
    let puzzle = capturePuzzle();
    if (validatePuzzle(puzzle)) {
        board = puzzle; // Set the board to the user input
        if (SudokuSolver(board, 0, 0, 9)) {
            FillBoard(board); // Fill the board with the solved puzzle
        } else {
            alert("No solution exists for this puzzle.");
        }
    } else {
        alert("Invalid puzzle! Please check your input.");
    }
});

// Sudoku solver function
function SudokuSolver(board, i, j, n) {
    // If we reach the end of the board
    if (i == n) {
        return true; // Puzzle solved
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

// Function to check if placing a number is safe
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

    return true; // Safe to place the number
}
