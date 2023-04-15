//return error if no solution is found
function permutate(arr, cross) {
    // If stop is true, which is probably a flag to stop the function 
    // from further execution, the function returns immediately.

    if (stop) return;


    /*
    If the arr array is empty, the function checks if print is set to 'Error'. 
    If it is, the function joins the cross array of arrays and sets the resulting 
    string to the print variable. Otherwise, the function sets stop to true and 
    sets the print variable to 'Error'. Either way, the function returns immediately. 
    */

    if (arr.length == 0) {
        if (print == 'Error') {
            print = cross.map(array => {
                return array.join('')
            }).join('\n');
        } else {
            stop = true;
            print = 'Error';
        }
        return;
    }
    let level = initiallength - arr.length;

    /*
    The function sets a variable level to the difference between initiallength 
    (which is probably defined outside the function) and the length of the arr array. 
    This is likely used to keep track of the depth of recursion in the function.
     */

    for (let i = 0; i < arr.length; i++) {
        let copy = copyArr(arr);
        let parent = copy.splice(i, 1);

        let crosswordCopy = copyArr(cross);
        let isMatch = isMatching(level, parent[0], crosswordCopy);

        if (isMatch) {
            var result = placeWord(level, parent[0], crosswordCopy);
            permutate(copy, result);
        }

    }

    /*
    This is the main loop of the function. 
    It iterates through the arr array and performs the following steps for each element:
    
    It creates a copy of the arr array using the copyArr function (which is not shown here).
    
    It removes the current element from the copy array and stores it in the parent variable.
    
    It creates a copy of the cross array using the copyArr function.
    
    It calls the isMatching function, passing in the level, the parent element, 
    and the crosswordCopy array. This function probably checks if the parent element 
    can be placed in the crosswordCopy array at the current level.
    
    If the isMatch variable is true, the function calls the placeWord function, 
    passing in the level, the parent element, and the crosswordCopy array. 
    This function probably modifies the crosswordCopy array to place the parent 
    element at the current level.
    
    Finally, the function calls itself recursively with the copy array and the 
    result variable (which is the modified crosswordCopy array).
        
    */
}

//Check if words fits into crossword at particular index
function isMatching(index, word, arr) {
    const localIndices = indesies[index];
    /*
    This line declares a variable named localindesies 
    and assigns to it the value of the index-th element of an array named indesies.
    */

    if (word.length !== localIndices.length) {
        return false;
    }
    /*
    This line checks if the length of the word parameter is not equal 
    to the length of the localindesies array. 
    If they are not equal, the function returns false.
    */

    for (let i = 0; i < localIndices.length; i++) {
        const row = localIndices[i].row;
        const col = localIndices[i].col;


        /*
        This line declares two variables named row and col, 
        and assigns to them the values of the row and col 
        properties of the i-th element of the localindesies array.
        */

        const chInCrossword = arr[row][col];
        /*
        This line declares a variable named chInCrossword, 
        and assigns to it the value of the character at the position [row][col] of the arr array.
        */

        if (chInCrossword === '') {
            continue;
        }
        /*
        This line checks if the value of chInCrossword 
        is an empty string. If it is, the loop continues to the next iteration.
        */

        if (chInCrossword !== word[i]) {
            return false;
        }
        /*
        This line checks if the value of chInCrossword is not equal 
        to the i-th character of the word parameter. 
        If they are not equal, the function returns false.

        */
    }

    return true;
}


//Places word at particular index in structure
function placeWord(index, word, crossword) {
    const localIndices = indesies[index];
    
    for (let i = 0; i < localIndices.length; i++) {
      const row = localIndices[i].row;
      const col = localIndices[i].col;
  
      crossword[row][col] = word[i];
    }
  
    return crossword;
  }


const createCrossword = (str) => {

    str = str.trim();
    if (str == '') return 'Error';

    let result = [];
    let rows = str.split('\n');
    for (let i = 0; i < rows.length; i++) {
        let col = rows[i].split('');
        let colF = [];
        for (let j = 0; j < col.length; j++) {
            if (col[j] == '0' || col[j] == '1') {
                colF.push('');
            } else if (col[j] == '.' || col[j] == '2') {
                colF.push(col[j]);
            } else {
                return 'Error';
            }
        }
        result.push(colF);
    }

    // Check number 2
    for (let row = 0; row < result.length; row++) {
        for (let col = 0; col < result[row].length; col++) {
            let ch = result[row][col];
            if (ch == '2') {
                // To be a valid 2, we need to have nothing on the left and top
                // and something on the right and bottom
                if ((col - 1 < 0 || result[row][col - 1] == '.') &&
                    (row - 1 < 0 || result[row - 1][col] == '.') &&
                    col + 1 < result[0].length &&
                    result[row][col + 1] != '.' &&
                    row + 1 < result.length &&
                    result[row + 1][col] != '.') {
                    result[row][col] = '';
                } else {
                    return "Error";
                }
            }
        }
    }
    return result;
}

const createIndecies = (arr) => {
    let result = [];
    let ind = undefined;

    // Horizontal     
    for (let row = 0; row < arr.length; row++) {
        ind = undefined;
        for (let col = 0; col < arr[row].length; col++) {
            let ch = arr[row][col];
            if (ch == '') {
                if (ind == undefined) ind = [];
                ind.push({ row, col });
            } else {
                if (ind != undefined && ind.length > 1) {
                    let _ind = ind.slice();
                    result.push(_ind);
                }
                ind = undefined;
            }
        }
        if (ind != undefined && ind.length > 1) {
            let _ind = ind.slice();
            result.push(_ind);
            ind = undefined;
        }
    }

    // Vertical
    ind = undefined;
    for (let col = 0; col < arr[0].length; col++) {
        ind = undefined;
        for (let row = 0; row < arr.length; row++) {
            let ch = arr[row][col];
            if (ch == '') {
                if (ind == undefined) ind = [];
                ind.push({ row, col });
            } else {
                if (ind != undefined && ind.length > 1) {
                    let _ind = ind.slice();
                    result.push(_ind);
                }
                ind = undefined;
            }
        }
        if (ind != undefined && ind.length > 1) {
            let _ind = ind.slice();
            result.push(_ind);
            ind = undefined;
        }
    }

    return result;
}


const crosswordSolver = (puzzle, words) => {
    //Check for puzzle and array words format
    if (typeof puzzle != "string" || !Array.isArray(words)) {
        console.log("Error");
        return;
    }

    /*
    it loops through each item in the words array and checks 
    if each one is a string. If any item is not a string, 
    it will print an error message and return undefined.
    */

    //Check for words items format
    for (let i = 0; i < words.length; i++) {
        if (typeof words[i] != "string") {
            console.log("Error");
            return;
        }
    /*
    It then initializes a variable initiallength to the length of the words array, 
    creates a crossword puzzle using the createCrossword() function, 
    and checks if the result is 'Error'. 
    If it is, it will print an error message and return undefined.
    */
    }

    initiallength = words.length;
    let crossword = createCrossword(puzzle);
    if (crossword === 'Error') {
        console.log("Error");
        return;
    /*
    It then creates a variable indesies using the createIndecies() function, 
    which is not defined in this code snippet. 
    Finally, it calls the permutate() function with the words array and 
    crossword puzzle as arguments, and then prints the result of the print variable.
    */
    }
    indesies = createIndecies(crossword);
    permutate(words, crossword)
    console.log(print);
}

let stop = false;

let initiallength;
let indesies;

var print = "Error";

// arr1 = ['1','2','3']
// arr2 = copyArr(arr1)

// We need to create this func as arr2 replaced data in arr1. We don't require it.
const copyArr = (arr) => {
    return JSON.parse(JSON.stringify(arr))
}

// const puzzle = '2001\n0..0\n1000\n0..0'
// const words = ['casa', 'alan', 'ciao', 'anta'];
// crosswordSolver(puzzle, words);

const puzzle = '2001\n0..0\n2000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']


crosswordSolver(puzzle, words);
