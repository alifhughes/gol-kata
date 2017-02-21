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

    // The functions to be exported
    return {
        evolve: evolve,
        getNeighbourCount: getNeighbourCount,
        isBeforeStart: isBeforeStart,
        isOutBoundary: isOutBoundary
    };
};

/**
 * Add a to b. Used in the reducing of the array values to count the neighbours
 *
 * @param   {int} a  First number to add
 * @param   {int} b  The second number to add
 * @return  {int}    The addition of the the two parameters
 */
function add(a, b) {
    return a + b;
}

/**
 * Checks if the column value is in the boundaries of the mask, if it is the 
 * value of the column is preserved. If it isn't the value is set to 0, so that
 * it doesn't affect the neighbour count.
 *
 * @param  {int} cellColumn  The column index of the cell being checked
 * @return {int}             The updated value of the cell value to be included
 *                           in the array
 */
function isColumnInMask (cellColumn) {

    // Get the starting column index for the mask and the mask boundary
    var startingColumnIndex = cellColumn - 1;
    var maskColumnBoundary  = cellColumn + 1;

    // Return the update column values for each row
    return function(row) {

        // For each element in the row, set their value to the either 0
        // if in the mask, or the value of the cell if it is in the mask
        return row.map(function (cellValue, columnIndex) {

            // Check if the colum index exceeds the mask boundary
            if (isOutBoundary(columnIndex, maskColumnBoundary)) {
                // Index out of bounds
                return 0;
            }

            // Check if the column index is before the index of the mask
            // start position
            if (isBeforeStart(columnIndex, startingColumnIndex)) {
                // Index is below the starting position
                return 0;
            }

            // Is in mask row boundaries, return the value of the cell
            return cellValue;

        });
    }
};

/**
 * Checks if the row is in the boundaries of the mask. If it is, it is
 * included in the array.
 *
 * @param {int} cellRow  The row index of the cell being checked
 * @return {bool}        True if the row is in bounds of the mask, false
 *                       if it isn't
 */
function isInMaskRow(cellRow) {

    // Get the starting row index for the mask and the mask boundary
    var startingRowIndex = cellRow - 1;
    var maskRowBoundary  = cellRow + 1;

    // Check if row is in the boundaries of the mask and return outcome
    return function (rowOfElements, rowIndex) {

        // Check if row index is in bounds of mask boundary
        if (isOutBoundary(rowIndex, maskRowBoundary)) {
            // Row index is greater than the row boundary of the mask
            return false;
        }

        // Check if row index is before the starting row index
        // of the mask
        if (isBeforeStart(rowIndex, startingRowIndex)) {
            // It is out of the boundary, return false
            return false;
        }

        // Row is with the boundaries, return true to include in array
        return true;
    };
};

/**
 * Give a cell's index positions, it will return the amount of neighbours
 * that cell has
 *
 * @param  {array}  gridState       The current grid state
 * @param  {int}    cellValue       The current value of the cell being checked
 * @param  {int}    row             The current cell's row index
 * @param  {int}    column          The current cell's column index
 * @return {int}    neighbourCount  The number of neighbours that the
 *                                  cell has
 */
function getNeighbourCount(gridState, cellValue, row, column) {

    // Initialise neighbour count
    var neighbourCount = 0;

    // Get the rows in the mask
    maskArrayRows = gridState.filter(isInMaskRow(row));

    // Get the column values that are in mask from the rows
    maskArrayColumns = maskArrayRows.map(isColumnInMask(column));

    // Flatten array the maskArray to single un-nested array
    var flattenedMaskArray = [].concat.apply([], maskArrayColumns);

    // Add all neighbours together
    neighbourCount = flattenedMaskArray.reduce(add, 0);

    // Take away the cell value from neighbour count
    neighbourCount = neighbourCount - cellValue;

    // Return neighbour count
    return neighbourCount;
};

/**
 * Update the cell values according to the rules defined compared to the cell's 
 * neighbourCount
 *
 * @param {array} gridState    The current gird state
 * @param {int}   cellValue    The value in the current cell
 * @param {int}   rowIndex     The current row index
 * @param {int}   columnIndex  The current column index
 * @return {int}               The updated cell value
 */
function updateCell(gridState, cellValue, rowIndex, columnIndex) {

    // Get the current cell's neighbour count
    var neighbourCount =
        getNeighbourCount(gridState, cellValue, rowIndex, columnIndex);

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
    return cellValue;
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
 * Check if the index is before the boundary value
 *
 * @param  {int} index          The index to be checked against
 * @param  {int} boundaryValue  The boundary value to be checked against
 * @return {bool}               True if the boundary is before the start, 
 *                              false otherwise
 */
function isBeforeStart(index, boundaryValue) {
    return (index < boundaryValue) ? true : false;
}

/**
 * Check if the index is out of bounds of the boundary value
 *
 * @param  {int} index          The index to be checked against
 * @param  {int} boundaryValue  The boundary value to be checked against
 * @return {bool}               True if the boundary is out of bounds,
 *                              false otherwise
 */
function isOutBoundary(index, boundaryValue) {
    return (index > boundaryValue) ? true : false;
}
