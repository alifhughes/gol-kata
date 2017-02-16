describe('Game', function (){

    // Get the functions to test from the gol.js file
    var evolve  = require('../script/gol')().evolve;
    var checkNeighbours  = require('../script/gol')().checkNeighbours;
    var cellPositions = require('../script/gol')().cellPositions;

    /**
     * Testing evolving an empty grid
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
     * Testing checking of neighbours
     */
    it('can detect how many neighbours a given cell has', function(){

        // Initiliase a grid with no neighbours
        var resultState = [
            [0,0,0],
            [0,0,1],
            [0,0,0]
        ];

        // Initialise a cell's positions
        var cellPosition = {
            row: 1,
            column: 2
        };

        // Assert that there are no neighbours
        expect(checkNeighbours(resultState, cellPosition)).toEqual(0);


        // Initiliase a grid with 2 neighbours
        var resultState = [
            [0,0,1],
            [0,1,1],
            [0,0,0]
        ];

        // Assert that there are 2 neighbours
        expect(checkNeighbours(resultState, cellPosition)).toEqual(2);

    });

});
