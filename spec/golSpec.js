describe('Game', function (){

    // Get the functions to test from the gol.js file
    var evolve  = require('../script/gol')().evolve;
    var getNeighbourCount = require('../script/gol')().getNeighbourCount;
    var isOutOfBounds = require('../script/gol')().isOutOfBounds;

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

        // Pass in initial empty grid
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
     * Testing scenario 2: Overcrowding
     */
    it('can kill a cell if it has more than three neighbours', function () {

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
     * Testing evolving grid in expected way by document
     */
    it('can evolve a grid as expected by documentation', function(){

        // Pass in initial empty grid
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

        // Pass in initial empty grid
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
        expect(getNeighbourCount(noNeighboursGrid, 1, 2)).toEqual(0);

        // Initiliase a grid with 2 neighbours
        var twoNeighboursGrid = [
            [0,0,0],
            [1,1,1],
            [0,0,0]
        ];

        // Assert that there are 2 neighbours
        expect(getNeighbourCount(twoNeighboursGrid, 0, 2)).toEqual(2);

        // Initiliase a grid with 2 neighbours
        var twoNeighboursGrid = [
            [0,0,1],
            [0,1,1],
            [0,0,0]
        ];

        // Assert that there are 2 neighbours
        expect(getNeighbourCount(twoNeighboursGrid, 1, 2)).toEqual(2);


        // Initiliase a grid with 2 neighbours
        var twoNeighboursGrid = [
            [0,1,0],
            [0,1,0],
            [0,1,0]
        ];

        // Assert that there are 2 neighbours
        expect(getNeighbourCount(twoNeighboursGrid, 0, 2)).toEqual(2);

    });

    /**
     * Testing if it can detect if index is out of bounds of array
     */
    it('can detect whether an index is out of bounds of an array', function () {

        // Initialise arbitrary array
        var array = [0,0,0];

        // Assert that the index 4 is out of bounds of the array
        expect(isOutOfBounds(array, 4)).toEqual(true);


        // Assert that the index 1 is in bounds of the array
        expect(isOutOfBounds(array, 1)).toEqual(false);

    });

});
