## Design justification, process and assumptions

In this file I hope to document my creation process and justify any notable design decisions.

### Process

1. Wrote out again in my own words what the program should achieve and what the rules are to start to clarify for myself what is needed.
2. Created `package.json` file
    - Hope to add `npm start` script to it if front end is created
3. Initialised git repository
    - added `node_modules` directory and `npm-log` to the `.gitignore`
    - Initial commit
4. Initially coded it wrong, passing around an array of objects that contained the live cells positions
    - Hoped to cut down on not checking cells that weren't alive
    - Meant that I could check if this array had any objects, if not, no interactions and grid world returned untouched
    - If it did, then it would check only the live cell's neighbours and apply the rules
    - This is wrong because of _Scencario 4: Creation of life_ which needs to check dead cells to potentially create them if their neighbour count is 3 exactly
5. Created a working version
    - Checks cell by cell
    - Gets their neighbour count
    - Applies the rules
    - Updates `newState` accordingly
    - Passes all tests
6. Hope to refactor further
    - Change internal code to a more functional programming style
    - Change some loops for `.map()` functions
    - use `splice()` to make immutable variables
7. Finished refactoring whole code to functional programming style
    - Rid the program of loop
    - Separated the functions out
    - Updated the tests to reflect the new code

### Design justification

**TDD approach:**

Wish to attempt this with the _Test-driven Development_ methodology as it helps me to define exactly what is needed from functions, and therefore makes the functions more concise and clear. It also makes the program as a whole more robust and one would assume eventually leads to faster development of features. Personally, as stated, it helps me to not get overwhelmed and forces me to think through exactly what is needed, rather than jumping straight into the code. I will follow 'Red-Green-Refactor' pattern.

**Coding Convention:**

My first thought (and I initially did do this..) was to change the skeleton `gol.js` code into this formatting:

```javascript
var gol = function() {
    return this;
};

gol.evolve = function (gridState) {
       var newState = [];

        return newState;
}


module.exports = gol;
```
I was tempted to do this because it is the way I was taught to program in JavaScript on my industrial placement and was the coding convention of that company. However, I reverted my code and decided to stick to the convention provided for two reasons: even though this is only a Kata to show our skill, it could be seen as a piece of work for a company and therefore the convention provided is the convention used by the company itself. If this is the case then I believe that you should always stick to the coding conventions of the company to promote consistency of the code base. The second reason I chose to stick to this convention was because it is unfamiliar to me, and therefore, is a new challenge to see if I can learn this style.

**Refactoring to functional programming style:**

I initially coded the Kata using two nested loops, one 'main' loop to go through all the cell values individually and another to get the neighbours of that cell (this version can be seen in the commit history). Although this solution worked, I found it to be quite messy and not very maintainable. An example of this could be seen as the looping variables `i` and `j` could easily be mistaken for each other and therefore bugs could occur. After some thought I decided to completely refactor the code to a functional programming style, I did this for a number of reasons. Firstly, I have been trying to learn more 'functional programming' and saw this as a perfect opportunity to try it out, this is due to the two nested loops, which is considered bad practise anyway, but isn't allowed in functional programming at all. I also did it because, as said, nested loops can be seen as bad practice. It add complexity to the code, it is hard to reuse, maintain and assumes that the variables are constantly changing. Instead, I broke out of the loops using `map()`, `filter()` and `reduce()` functions on the `gridState` array which instead of 'mutating' the values in the array, keeps a working 'clone' of that array to edit. I think the resulting code is a lot more clearer and concise. It can also be seen as a 'separation of concerns', that is the loop functionality isn't in the implementation of the function, meaning that teh function does only what it is supposed to do on one piece of the data. Breaking the functions up can be seen to make the code a lot more maintainable as you can test the functions individually, they do not mutate the data and they can be re-used and composed together to create bigger functions.

### Assumptions

**Data consistency:**

The `gridState` array will always be of format row, and columns within the rows and the data within will always be 0s and 1s. Would have liked to add exception handling for data type checking but not in scope.

**The mask will always be the surrounding 8 values:**

I initially made it so the mask size, that is the mask around the cell to be checked for neighbours, could be altered and made bigger. However, I reverted these changes for simplicities' sake, and therefore I make the assumption that the mask size will not change.

### Improvements

Two main things I would have liked to improve on:
- Separating out the `if` statements in the code to other functions for the scenarios think could make the code better and clearer.
- Creating a front end
    - I would have loved to create front-end graphics for this project as I was working with JavaScript but I do not consider myself a 'front-end' programmer and I hope this is reflected in quality of my code for the 'backend'
