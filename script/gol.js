module.exports = function(){

    /**
     * Evolve function counts as a step in the game. Invokes other checks on the
     * scenarios
     *
     * @param  {array} gridState  The current grid state of the game
     * @return {array} newState   The new grid state after iteration
     */
    function evolve(gridState){

        // Initialise new state
        var newState = [];

        // Get the newly recreated grid world with the rules applied
        newState = forEachCell(gridState, updateCell);

        // Return newState
        return newState;
    }

    return {
        evolve: evolve,
        getNeighbourCount: getNeighbourCount
    };
};

function add(a, b) {
    return a + b;
}

function isInMask(cellRow, cellColumn) {

    // Get the starting positions to for mask check
    var startingRowIndex    = cellRow - 1;
    var startingColumnIndex = cellColumn - 1;

    // Initialise boundaries for loops
    var maskRowBoundary    = 1 + cellRow;
    var maskColumnBoundary = 1 + cellColumn;

    // Return anonymous function that further filters the array values
    return function (rowOfElements, rowIndex) {

        // Check if row index is in bounds of mask boundary
        if (rowIndex > maskRowBoundary) {
            // Row index is greater than the row boundary of the mask
            return false;
        }

        // Check if row index is out of the mask boundary
        if (rowIndex < startingRowIndex) {
            // It is out of the boundary, return false
            return false;
        }

        // Return a filtered list of the column values
        return rowOfElements.filter(function(value, columnIndex) {

            // Check if column index is in bounds of mask boundary
            if (columnIndex > maskColumnBoundary) {
                // Column index is out of bounds of the mask
                return false;
            }

            // Check if column index is less than the starting index
            if (columnIndex < startingColumnIndex){
                // it is less than the starting index

                // RETURNING FALSE BUT STILL INCLUDING THE COLUMN IN THE FINAL ARRAY?
                return false;
            }

            return true;

        });
    };

    return false;
};


/**
 * Give a cell's index positions, it will return the amount of neighbours
 * that cell has
 *
 * @param  {array}  gridState       The current grid state
 * @param  {int}    row             The current cell's row index
 * @param  {int}    column          The current cell's column index
 * @return {int}    neighbourCount  The number of neighbours that the
 *                                  cell has
 */
function getNeighbourCount(gridState, columnValue, row, column) {

    // Initialise neighbour count
    var neighbourCount = 0;

    // Get array of all the values in the gridState that are in the mask
    maskArray = gridState.filter(isInMask(row, column));
    console.log('maskArray', maskArray);

    // Flatten array the maskArray to single un-nested array
    var flattenedMaskArray = [].concat.apply([], maskArray);

    console.log('flattenedMaskArray', flattenedMaskArray);

    // Add all neighbours together
    neighbourCount = flattenedMaskArray.reduce(add, 0);

    console.log('neighbourCount', neighbourCount);
    // Take away the cell value from neighbour count
    neighbourCount = neighbourCount - columnValue;
    console.log('columnValue', columnValue);

    // Return neighbour count
    return neighbourCount;
};

/**
 * Reconsider:
 * - name
 * - else if
 */
function updateCell(gridState, columnValue, rowIndex, columnIndex) {

    // Get the current cell's neighbour count
    var neighbourCount = getNeighbourCount(gridState, columnValue, rowIndex, columnIndex);

    // Check the neighbour count against scenario conditions
    if (neighbourCount < 2) {
        // Scenario 1: Underpopulation
        return 0;

    } else if (neighbourCount > 3) {
        // Scenario 2: Overcrowding
        return 0;


    } else if (3 === neighbourCount) {
        // Scenario 4: Creation of Life
        return 1;

    }

    // Unaffected by scenarios, leave as is
    return columnValue;

};

/**
 * Perform the callback given as parameter to each cell in the gridState
 * passed in
 *
 * @param {array}    gridState The gridState of the world
 * @param {function} callback  The callback function to be applied to each
 *                             cell in the gridState
 * @return {array}   newState  The new state of the world after the computation
 */
function forEachCell(gridState, callback) {

    // Return the mapping of the anonymous function on the grid state
    return gridState.map(function (row, rowIndex) {

        // Return the copy of the row after anonymous founction been applied
        return row.slice().map(function (cellValue, columnIndex) {

            // Return the callback applied to the cellValue
            return callback(gridState, cellValue, rowIndex, columnIndex);

        });
    });
};

/**
 * Clones returns the elements of array passed in
 *
 * @param {array} array   The array you want to copy
 * @return {array}        A copy of array
 */
function cloneArray (array) {
    return array.slice();
};
