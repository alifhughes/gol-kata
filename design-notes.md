## Design justification and process

In this file I hope to document my creation process and justify any notable design decisions.

### Process

1. Wrote out again in my own words what the program should achieve and what the rules are to start to clarify for myself what is needed.
2. Created `package.json` file
    - Hope to add npm start script to it if front end is created
3. Initialised git repository
    - added `node_modules` directory and `npm-log` to the `.gitignore`
    - Initial commit

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
I was tempted to do this because it is the way I was taught to program in JavaScript on my industrial placement and was the coding convention of that company. However, I reverted my code and decided to stick to the convention provided for two reasons: even though this is only a Kata to show our skill, it could be seen as a piece of work for a company and therefore the convention provided is the convention used by the company itself. If this is the case then I believe that you should always stick to the coding conventions of the company to promote consistency of the code base. The second reason I chose to stick to this convention was because it is unfamiliar to me, and therefore, is a new challenge to see if I can learn this style. **ADD MORE ABOUT REASONING from TECH pov**
