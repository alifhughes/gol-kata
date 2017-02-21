describe('Game', function (){

    // Get the functions to test from the gol.js file
    var evolve  = require('../script/gol')().evolve;
    var getNeighbourCount = require('../script/gol')().getNeighbourCount;
    var isBeforeStart = require('../script/gol')().isBeforeStart;
    var isOutBoundary = require('../script/gol')().isOutBoundary;
    var add = require('../script/gol')().add;
    var isColumnInMask = require('../script/gol')().isColumnInMask;
    var isRowInMask = require('../script/gol')().isRowInMask;

    /**
     * Testing scenario 0: No interactions
     */
    it('can evolve an inital empty grid', function(){

        // Pass in initial empty grid
        var initialState = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];

        // Expected return
        var resultState = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];

        // Assert it has evolved an empty grid
        expect(evolve(initialState)).toEqual(resultState);

    });

    /**
     * Testing scenario 1: Underpopulation
     */
    it('can kill a cell if it has less than two neighbours', function () {

        // Pass in initial grid
        var initialState = [
            [0,0,0],
            [0,1,0],
            [0,0,0]
        ];

        // Expected return
        var resultState = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];

        // Assert it has evolved an empty grid
        expect(evolve(initialState)).toEqual(resultState);


    });

    /**
     * Testing evolving grid in expected way by document
     */
    it('can evolve a grid as expected by documentation', function(){

        // Pass in initial grid
        var initialState = [
            [0,0,0],
            [1,1,1],
            [0,0,0]
        ];

        // Expected return
        var resultState = [
            [0,1,0],
            [0,1,0],
            [0,1,0]
        ];

        // Assert it has evolved an empty grid
        expect(evolve(initialState)).toEqual(resultState);

    });

    /**
     * Testing evolving grid in expected way by document
     */
    it('can evolve a grid as expected by documentation', function(){

        // Pass in initial grid
        var initialState = [
            [0,1,0],
            [0,1,0],
            [0,1,0]
        ];

        // Expected return
        var resultState = [
            [0,0,0],
            [1,1,1],
            [0,0,0]
        ];

        // Assert it has evolved an empty grid
        expect(evolve(initialState)).toEqual(resultState);

    });

    /**
     * Testing is row in mask
     */
    it('can return the rows in the mask', function(){

        // Pass in initial grid
        var gridState = [
            [0,1,0],
            [0,1,0],
            [0,1,0]
        ];

        // Current row to be checked against
        var row = 0;

        // Expected rows
        var expectedRows = [[0,1,0], [0,1,0]];

        // Get the filtered rows
        maskRow = gridState.filter(isRowInMask(row));

        // Assert expected value is correct
        expect(maskRow).toEqual(expectedRows);

    });

    /**
     * Testing is column is mask
     */
    it('can return the column in the mask', function(){

        // Pass in initial grid
        var maskRows= [
            [1,1,0],
            [1,1,0]
        ];

        // Current column cell to be checked against
        var column = 2;

        // Expected column values
        var columnValues = [[0,1,0], [0,1,0]];

        // Get the filtered rows
        maskColumn = maskRows.map(isColumnInMask(column));

        // Assert expected value is correct
        expect(maskColumn).toEqual(columnValues);

    });

    /**
     * Testing the count of neighbours to a cell
     */
    it('can count the number of neighbours a cell has in the surrounding grid', function () {

        // Initiliase a grid with no neighbours
        var noNeighboursGrid = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];

        // Assert that no neighbours grid returns a grid state with empty values
        expect(getNeighbourCount(noNeighboursGrid, 0, 1, 2)).toEqual(0);

        // Initiliase a grid with 2 neighbours
        var twoNeighboursGrid = [
            [0,0,0],
            [1,1,1],
            [0,0,0]
        ];

        // Assert that there are 2 neighbours
        expect(getNeighbourCount(twoNeighboursGrid, 0, 0, 2)).toEqual(2);

        // Initiliase a grid with 2 neighbours
        var twoNeighboursGrid = [
            [0,0,1],
            [0,1,1],
            [0,0,0]
        ];

        // Assert that there are 2 neighbours
        expect(getNeighbourCount(twoNeighboursGrid, 1, 1, 2)).toEqual(2);

        // Initiliase a grid with 2 neighbours
        var twoNeighboursGrid = [
            [0,1,0],
            [0,1,0],
            [0,1,0]
        ];

        // Assert that there are 2 neighbours
        expect(getNeighbourCount(twoNeighboursGrid, 0, 0, 2)).toEqual(2);

        // Initiliase a grid with 8 neighbours
        var eightNeighboursGrid = [
            [1,1,1],
            [1,1,1],
            [1,1,1]
        ];

        // Assert that there are 8 neighbours
        expect(getNeighbourCount(eightNeighboursGrid, 1, 1, 1)).toEqual(8);

    });

    /**
     * Testing if the index is out of bounds
     */
    it('can detect if index value is out of bounds', function () {

        // Assert expected values are correct
        expect(isOutBoundary(1, 0)).toEqual(true);
        expect(isOutBoundary(-1, 0)).toEqual(false);

    });

    /**
     * Testing if index is before a given value
     */
    it('can detect if index value is before a value', function () {

        // Assert expected values are correct
        expect(isBeforeStart(1, 2)).toEqual(true);
        expect(isBeforeStart(4, 1)).toEqual(false);

    });

    /**
     * Testing if it can add two numbers correctly
     */
    it('can add two values together', function () {

        // Assert expected values are correct
        expect(add(1, 2)).toEqual(3);
        expect(add(4, 1)).toEqual(5);

    });

});
