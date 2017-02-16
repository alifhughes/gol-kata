module.exports = function(){

    // Better to make global variable or dependancy injection?
    // Cell positions array containing object of a cells row and column index
    //this.cellPositions = [];

    /**
     * Evolve function counts as a step in the game. Invokes other checks on the
     * scenarios
     *
     * @param  {array} gridState  The current grid state of the game
     * @return {array} newState   The new grid state after iteration
     */
    function evolve(gridState){

        // Initialise new state grid
        var newState = [];

        // Get the positions of cells in the grid
        cellPositions = getCellPositions(gridState);

        // Check if there are any cells in cellPositions array
        if (0 === cellPositions.length) {
            // No cells in array therefore no interactions

            // Return the initial gridState as no changes
            return gridState;
        }

    }

    return {
        evolve: evolve,
        checkNeighbours: checkNeighbours
    };
};

/**
 * Get an array of the positions of the cells by iterating through the grid state
 *
 * @param {array}  gridState         The current grid state
 * @return {array} particlePositions An array of the cells x y positions
 */
function getCellPositions(gridState) {

    // Initialise empty cell position array
    cellPositions = [];

    // Iterate each row of array
    for (var i = 0; i < gridState.length; i++) {

        // Iterate each column of the current iterations row
        for (var j = 0; j < gridState[i].length; j++) {

            // Check if current position's has a cell
            if (0 === gridState[i][j]) {
                // Cell is dead
                continue;
            }

            // Cell is alive

            // Initialise object for the current cell
            var cellIndexes = {};

            // Add the row and column indexes to this cell's object
            cellIndexes.row = i;
            cellIndexes.column = j;

            // Push the current cell's indexes onto the array of cell positions
            cellPositions.push(cellIndexes);

        }
    }

    // Return the cellPositions array
    return cellPositions;
};

/**
 * Give a cell's index positions, it will check how many neighbours it has in its surrounding area
 *
 * @param  {array}  gridState      The current grid state
 * @param  {object} cellPosition   A cell's row and column index
 * @return {int}    neighbourCount The number of neighbours that is in the area of the given cell
 */
function checkNeighbours (gridState, cellPosition) {

    // Initialise neighbour count
    var neighbourCount = 0;

    // Set up mask size around the cell's position to check for neighbours
    var mask = 8;

    // Get the number of rows and columns that is needed to count back from cell's position to get to the first neighbour to check
    var maskRadiusFromIndex = mask / 8;

    // Get the starting positions to for mask check
    var startingRowIndex    = cellPosition.row - maskRadiusFromIndex;
    var startingColumnIndex = cellPosition.column - maskRadiusFromIndex;

    // Initialise boundary for loop
    var maskBoundary = maskRadiusFromIndex + cellPosition.column

    // Iterate all neighbours by row
    for (var i = startingRowIndex; i < maskBoundary; i++) {

        // Check if index is out of bounds of the array
        if (i > gridState.length) {
            // Is out of bounds
            continue;
        }

        // Iterate all neighbours by column
        for (var j = startingColumnIndex; j < maskBoundary; j++) {

            // Check if index is out of bounds of the array
            if (j > gridState[i].length) {
                // Is out of bounds
                continue;
            }

            // Check if current position is the position of the cell
            if (cellPosition.row === i && cellPosition.column ===  j) {
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
