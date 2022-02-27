// grab the solve button using querySelector

var solve = document.body.querySelector("button");
var arr = [[0, 0, 0, 0, 0, 0, 0, 0, 0]
         , [0, 0, 0, 0, 0, 0, 0, 0, 0]
         , [0, 0, 0, 0, 0, 0, 0, 0, 0]
         , [0, 0, 0, 0, 0, 0, 0, 0, 0]
         , [0, 0, 0, 0, 0, 0, 0, 0, 0]
         , [0, 0, 0, 0, 0, 0, 0, 0, 0]
         , [0, 0, 0, 0, 0, 0, 0, 0, 0]
         , [0, 0, 0, 0, 0, 0, 0, 0, 0]
         , [0, 0, 0, 0, 0, 0, 0, 0, 0]];


// fill the elements in array then calculate the sudoku and print them
solve.addEventListener("click" , function()
{
    for(var i = 0 ; i < 9 ; i++)
    {
        for(var j = 0 ; j < 9 ; j++)
        {
            const v = document.body.querySelector("#r" + (i + 1) + "n" + (j + 1));

            var num = 0;

            if (v.value === "")
            {
                num = 0;
            }
            else 
            {
                num = v.value;
            }

            arr[i][j] = num;
        }
    }
    
    // arr.forEach(element => {
    //     console.log(element);
    // });

    const flag = isValid(0, 0, 0);
    console.log("Sudoku is valid : ", flag);
    
    
    if(!flag)
    {
        var heading = document.body.querySelector("h1");
        console.log(heading.innerHTML);
        heading.append(" not possible bcz this sudoku is not valid");
    }

    

    else
    {
        sudokuSolver(0 , 0);

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {

                const v = document.body.querySelector("#r" + (i + 1) + "n" + (j + 1));

                v.value = arr[i][j];
            }
        }

    }


    
    
})

function isValid(row , col , rowCol)
{
    if (rowCol == 9) {
        return true;
    }

    if (row == 9) {
        return true;
    }

    if (col == 9) {
        return isValid( row + 3, 0, rowCol);
    }

    // HashSet < Integer > set = new HashSet < Integer > ();
    const set = new Set();

    // check the rowCol'th row
    var emptyCount = 0;

    for (var i = 0; i < 9 ; i++)
    {
         var ch = arr[rowCol][i];

        if (ch != 0) {
                var num = ch - '0';
                set.add(num);
        }
        else {
            emptyCount++;
        }
    }

    if (emptyCount + set.size != 9) {
        return false;
    }

    // check the rowCol'th col
    emptyCount = 0;
    set.clear();
    for (var i = 0; i < 9 ; i++)
    {
            var ch = arr[i][rowCol];
        if (ch != 0) {
            var num = ch - '0';
            set.add(num);
        }
        else {
            emptyCount++;
        }
    }

    if (emptyCount + set.size != 9) {
        return false;
    }


    // check the particular 3 * 3 box
    emptyCount = 0;
    set.clear();
    for (var i = row; i < row + 3; i++) {
        for (var j = col; j < col + 3; j++) {

                var ch = arr[i][j];
            if (ch != 0) {
                    var num = ch - '0';
                set.add(num);
            }
            else {
                emptyCount++;
            }

        }
    }

    if (emptyCount + set.size != 9) {
        return false;
    }

    return isValid( row, col + 3, rowCol + 1);
}


function sudokuSolver(row,  col)
{
    if (row == 9) {
        return true;
    }

        // find out the next row and col
        var nRow = 0;
        var nCol = 0;

    if (col == 8) {
        nRow = row + 1;
        nCol = 0;
    }
    else {
        nRow = row;
        nCol = col + 1;
    }


    if (arr[row][col] != 0) {
        if (sudokuSolver( nRow, nCol)) {
            return true;
        }
    }

    else {
        for (var i = 1; i <= 9; i++) {

            if (isSafe( i, row, col)) {

                arr[row][col] = i;

                // console.log('arr[' + row + '][' + col + '] = ', i);
                

                if (sudokuSolver(nRow, nCol)) {
                    return true;
                }

                else {
                    arr[row][col] = 0;
                }
            }

        }
    }

    return false;

}

function isSafe(element , row , col)
{
    // check col

    for (var i = 0; i < 9; i++) {
        if (arr[i][col] == element) {
            return false;
        }
    }

    // check row

    for (var i = 0; i < 9; i++) {
        if (arr[row][i] == element) {
            return false;
        }
    }

        // check box
        // starting row and col of particular 3 * 3 box

        var sRow = row - row % 3;
        var sCol = col - col % 3;

    for (var i = sRow; i < sRow + 3; i++) {
        for (var j = sCol; j < sCol + 3; j++) {

            if (arr[i][j] == element) {
                return false;
            }
        }
    }

    // if nothing is false
    return true;
}
