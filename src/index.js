function fillMatrix (matrix) {
  var allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 0) {
        continue;
      }
      allNumbers.splice(allNumbers.indexOf(matrix[i][j]), 1);
    }
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 0) {
        matrix[i][j] = allNumbers.slice();
      }
    }
    allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
  for (var i = 0; i < matrix.length; i++) {
    var tempNumbers = [];
    for (var j = 0; j < matrix[i].length; j++) {
      if (Array.isArray(matrix[j][i])) {
        continue;
      }
      tempNumbers.push(matrix[j][i]);
    }
    for (var j = 0; j < matrix[i].length; j++) {
      if (Array.isArray(matrix[j][i])) {
          for (var k = 0; k < tempNumbers.length; k++) {
              if ((matrix[j][i]).includes(tempNumbers[k])) {
                  matrix[j][i].splice(matrix[j][i].indexOf(tempNumbers[k]), 1);
                  if (matrix[j][i].length == 1) {
                    matrix[j][i] = matrix[j][i][0];
                    break;
                  }
                }
          }
      }
    }

  }

  var n = 0;
  var m = 2;
  var k = 0;
  var p = 2;
  // debugger;
  while (m <= 8) {
      var tempNumbers = [];
      for (var i = n; i <= m; i++) {
          for (var j = k; j <= p; j++) {
              if (Array.isArray(matrix[i][j])) {
                  continue;
              }
              tempNumbers.push(matrix[i][j]);
          }
      }
      for (var i = n; i <= m; i++) {
          for (var j = k; j <= p; j++) {
              if (Array.isArray(matrix[i][j])) {
                  for (var r = 0; r < tempNumbers.length; r++) {
                      if ((matrix[i][j]).includes(tempNumbers[r])) {
                          matrix[i][j].splice(matrix[i][j].indexOf(tempNumbers[r]), 1);
                          if (matrix[i][j].length == 1) {
                              matrix[i][j] = matrix[i][j][0];
                              break;
                          }
                      }
                  }
              }
          }
      }
      k += 3;
      p += 3;
      if (p > 8) {
          n += 3;
          m += 3;
          k = 0;
          p = 0;
      }
  }
  return matrix;
}

function isSolved (matrix) {
  for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
          if (Array.isArray(matrix[i][j])) {
              return false;
          }
      }
  }
  return true;
}

function checkRow (matrix, i, value) {
  if (Array.isArray(value)) {
      for (var j = 0; j < matrix[i].length; j++) {
          if (value.includes(matrix[i][j])) {
              value.splice(value.indexOf(matrix[i][j]), 1);
          }
      }
      return value.length == 1 ? value[0] : value;
  }
  else {
      for (var j = 0; j < matrix[i].length; j++) {
          if (Array.isArray(matrix[i][j])) {
              if (matrix[i][j].includes(value)){
                  matrix[i][j].splice(matrix[i][j].indexOf(value), 1);
                  if (matrix[i][j].length == 1) {
                      matrix[i][j] = matrix[i][j][0];
                      matrix[i][j] = checkRow(matrix, i, matrix[i][j]);
                      matrix = checkCol(matrix, j, matrix[i][j]);
                      matrix = checkSquare(i, j, matrix[i][j], matrix);
                  }
              }
          }
      }
      return value;
  }
}

function checkCol (matrix, j, value) {
  if (!Array.isArray(value)) {
      for (var i = 0; i < matrix.length; i++) {
          if (Array.isArray(matrix[i][j])) {
              if (matrix[i][j].includes(value)) {
                  matrix[i][j].splice(matrix[i][j].indexOf(value), 1);
                  if (matrix[i][j].length == 1) {
                      matrix[i][j] = matrix[i][j][0];
                      matrix[i][j] = checkRow(matrix, i, matrix[i][j]);
                      matrix = checkCol(matrix, j, matrix[i][j]);
                      matrix = checkSquare(i, j, matrix[i][j], matrix);
                  }
              }
          }
      }
      return matrix;
  }
  else {
      for (var i = 0; i < matrix.length; i++) {
          if (value.includes(matrix[i][j])) {
              value.splice(value.indexOf(matrix[i][j]), 1);
          }
      }
      return value.length == 1 ? value[0] : value;
  }
}

function checkSquare(i, j, value, matrix) {
  var n = 0, m = 0, k = 0, p = 0;
  if (i >= 0 && i <= 2) {
      n = 0;
      m = 2;
  }
  else if (i >= 3 && i <= 5) {
      n = 3;
      m = 5;
  }
  else {
      n = 6;
      m = 8;
  }
  if (j >= 0 && j <= 2) {
      k = 0;
      p = 2;
  }
  else if (j >= 3 && j <= 5) {
      k = 3;
      p = 5;
  }
  else {
      k = 6;
      p = 8;
  }
  if (!Array.isArray(value)) {
      for (var i = n; i <= m; i++) {
          for (var j = k; j <= p; j++) {
              if (Array.isArray(matrix[i][j])) {
                  if (matrix[i][j].includes(value)) {
                      matrix[i][j].splice(matrix[i][j].indexOf(value), 1);
                      if (matrix[i][j].length == 1) {
                          matrix[i][j] = matrix[i][j][0];
                          matrix[i][j] = checkRow(matrix, i, matrix[i][j]);
                          matrix = checkCol(matrix, j, matrix[i][j]);
                          matrix = checkSquare(i, j, matrix[i][j], matrix);
                      }

                  }
              }
          }
      }
      return matrix;
  }
  else {
      for (var i = n; i <= m; i++) {
          for (var j = k; j <= p; j++) {
              if (value.includes(matrix[i][j])) {
                  value.splice(value.indexOf(matrix[i][j]), 1);
              }
          }
      }
      return value.length == 1 ? value[0] : value;
  }
  
}

function checkMatrix (matrix) {
  for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
          if (Array.isArray(matrix[i][j])) {
              matrix[i][j] = checkRow(matrix, i, matrix[i][j]);
              if (!Array.isArray(matrix[i][j])) {
                  matrix = checkCol(matrix, j, matrix[i][j]);
                  matrix = checkSquare(i, j, matrix[i][j], matrix);
              }
              else {
                  matrix[i][j] = checkCol(matrix, j, matrix[i][j]);
                  if (!Array.isArray(matrix[i][j])) {
                      matrix = checkSquare(i, j, matrix[i][j], matrix);
                  }
                  else {
                      matrix[i][j] = checkSquare(i, j, matrix[i][j], matrix);
                  }
              }
          }
      }
  }
  return matrix;
}

module.exports = function solveSudoku(matrix) {
  // your solution
  matrix = fillMatrix(matrix);
    matrix = checkMatrix(matrix);
    // console.log(matrix);
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (Array.isArray(matrix[i][j])) {
                matrix[i][j] = matrix[i][j][1];
                // matrix[i][j] = checkRow(matrix, i, matrix[i][j]);
                // // if (!Array.isArray(matrix[i][j])) {
                //     matrix = checkCol(matrix, j, matrix[i][j]);
                //     matrix = checkSquare(i, j, matrix[i][j], matrix);
                    matrix = checkMatrix(matrix);
                // }
                // else {
                //     matrix[i][j] = checkCol(matrix, j, matrix[i][j]);
                //     if (!Array.isArray(matrix[i][j])) {
                //         matrix = checkSquare(i, j, matrix[i][j], matrix);
                //     }
                //     else {
                //         matrix[i][j] = checkSquare(i, j, matrix[i][j], matrix);
                //     }
                // }
            }
        }
    }
  return matrix;
}
