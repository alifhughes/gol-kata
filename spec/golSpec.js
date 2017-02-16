describe('Game', function (){

    // Get the evolve function from the gol script
    var evolve  = require('../script/gol')().evolve;
    var test= require('../script/gol')().test;

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

});
