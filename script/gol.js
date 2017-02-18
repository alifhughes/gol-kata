module.exports = function(){

    /**
     * Evolve function counts as a step in the game. Invokes other checks on the
     * scenarios
     *
     * @param  {array} gridState  The current grid state of the game
     * @return {array} newState   The new grid state after iteration
     */
    function evolve(gridState){

        // Initiase new state grid
        newState = [];

        // Clone gridState to newState
        var newState = gridState.map(cloneArray);

        // Iterate all rows in the grid
        for (var i = 0; i < gridState.length; i++) {

            // Iterate all columns in the row
            for (var j = 0; j < gridState[i].length; j++) {

                // Get the current cell's neighbour count
                var neighbourCount = getNeighbourCount(gridState, i, j);

                // Check the neighbour count against scenario conditions
                if (neighbourCount < 2) {
                    // Scenario 1: Underpopulation

                    // Cell has less than two neighbours, cell dies
                    killCell(newState, i, j);

                } else if (neighbourCount > 3) {
                    // Scenario 2: Overcrowding

                    // Cell has more than three neighbours, cell dies
                    killCell(newState, i, j);

                } else if (3 === neighbourCount) {
                    // Scenario 4: Creation of Life

                    // Cell has 3 neighbours, cell is created
                    createCell(newState, i, j);

                }
            }
        }

        // Return newState
        return newState;
    }

    return {
        evolve: evolve,
        getNeighbourCount: getNeighbourCount,
        isOutOfBounds: isOutOfBounds
    };
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
function getNeighbourCount(gridState, row, column) {

    // Initialise neighbour count
    var neighbourCount = 0;

    // Set up mask size around the cell's position to check for neighbours
    var mask = 8;

    // Get the number of rows and columns that is needed to count back from
    // cell's position to get to the first neighbour to check
    var maskRadiusFromIndex = mask / 8;

    // Get the starting positions to for mask check
    var startingRowIndex    = row    - maskRadiusFromIndex;
    var startingColumnIndex = column - maskRadiusFromIndex;

    // Initialise boundaries for loops
    var maskRowBoundary    = maskRadiusFromIndex + row;
    var maskColumnBoundary = maskRadiusFromIndex + column;

    // Iterate all neighbours by row
    for (var i = startingRowIndex; i <= maskRowBoundary; i++) {

        // Check if index is out of bounds of the array
        if (isOutOfBounds(gridState, i)) {
            // Is out of bounds of array
            continue;
        }

        // Iterate all neighbours by column
        for (var j = startingColumnIndex; j <= maskColumnBoundary; j++) {

            // Check if index is out of bounds of the array
            if (isOutOfBounds(gridState[i], j)) {
                // Is out of bounds of array
                continue;
            }

            // Check if current position is the position of the cell
            if (row === i && column ===  j) {
                // Skip
                continue;

            } else if (1 === gridState[i][j]) {
                // Neighbour found
                // Increment neighbour count
                neighbourCount++;

            }
        }
    }

    // Return neighbour count
    return neighbourCount;
};


/**
 * Kill the cell at the position given in the grid state given by changing the
 * value to 0
 *
 * @param  {array}  newState       The new grid state
 * @param  {int}    row            A cell's row index
 * @param  {int}    column         A cell's column index
 */
function killCell (newState, row, column) {

    // Set the grid state's value at the cell positions to 0
    newState[row][column] = 0;
};

/**
 * Create a cell at the position given in the grid state given by changing 
 * the value to 1
 *
 * @param  {array}  newState       The new grid state
 * @param  {int}    row            A cell's row index
 * @param  {int}    column         A cell's column index
 */
function createCell (newState, row, column) {

    // Set the grid state's value at the cell positions to 0
    newState[row][column] = 1;

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

/**
 * Checks if the index provided is out of bounds of the array provided
 *
 * @param   {array} array  The array to check
 * @param   {int}   index  The index to check
 * @returns {bool}         True if index is out of bounds of array, false if not
 */
function isOutOfBounds (array, index) {

    // Check if index is out of bounds of the array
    if (index >= array.length || index < 0) {
        // Is out of bounds
        return true;
    }

    // Return false if in array
    return false;

}
