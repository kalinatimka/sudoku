function checkRow(matrix, row, num){
    for (var i = 0; i < 9; i++) {
        if (matrix[row][i] == num) {
           return false; 
        }
    }
    return true;
};

function checkColumn(matrix, col, num){
    for (var i = 0; i < 9; i++) {
        if (matrix[i][col] == num) {
            return false;
        } 
    }
    return true;
};

function checkSquare(matrix, row, col, num){
    var squareRow = 0;
    var squareCol = 0;

    if(row < 3){
        squareRow = 0;
    }
    else if(row < 6 && row >= 3){
        squareRow = 3;
    }
    else if(row >= 6){
        squareRow = 6;
    }
    if(col<3){
        squareCol = 0;
    }
    else if(col < 6 && col >= 3){
        squareCol = 3;
    }   
    else if(col >= 6){
        squareCol = 6;
    }

    for (var i = squareRow; i < squareRow + 3; i++) {
        for (var j = squareCol; j < squareCol + 3; j++) {
            if (matrix[i][j] == num) {
                return false;
            } 
        }
    }
    return true;
}

module.exports = function solveSudoku(matrix) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            j = matrix[i].indexOf(0);
            if (j != -1) {
                for (var num = 1; num < 10; num++) {
                    if (checkRow(matrix, i, num) && checkColumn(matrix, j, num) && checkSquare(matrix, i, j, num)) {
                        matrix[i][j] = num;
                        if (solveSudoku(matrix)) {
                            return matrix;  
                        } 
                    }
                }
                matrix[i][j] = 0;
                return false;
            }
            else {
                break;  
            }
        }
    }
    return true;
}
  