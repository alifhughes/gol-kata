describe('Game', function (){

    // Get the functions to test from the gol.js file
    var evolve  = require('../script/gol')().evolve;
    var getNeighbourCount = require('../script/gol')().getNeighbourCount;
    var isInBoundary = require('../script/gol')().isInBoundary;
    var isOutBoundary = require('../script/gol')().isOutBoundary;
    var add = require('../script/gol')().add;

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

    it('can detect if index value is out of bounds', function () {

        expect(isOutBoundary(1, 0)).toEqual(true);
        expect(isOutBoundary(-1, 0)).toEqual(false);
    });

});
