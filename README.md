# LWW Element Set in javascript

This is a simple LWW Element Set implementation in javascript.

# Initialization
To initialize everything, ensure you have node.js installed. cd into the project folder and run:

`npm install`

# Testing

To test the library, run this command:

`node lww-tests.js`

# Running

To run the library, just import it into your javascript project

# Functions

The main LWW functions are in main.js. 
In this implementation, added elements are stored in the `_addSet`. Removed elements are stored in the `_removeSet`.
Elements contain: an `elem` (element, or data) and `time` (Can be an integer, or when not provided, the current timestamp).
Here is a brief description of every function:

### constructor (`addBias`, `addSet`, `removeSet`)
>This is the entrypoint to the module. It takes in 3 parameters: `addBias`, `addSet` and `removeSet`. 

### add (`elem`, `time`)
>This function adds a new element to the `_addSet` set.

### remove (`elem`, `time`)
>This function adds a new element to the `_removeSet`

### compare (`T`)
>Compares `T` with the current set (`this`). If they are identical, returns `true`, otherwise returns `false`.

### merge (`T`)
>Merges `T` intto `this`, and returns `this` set.

### lookup (`data`)
>Searches for `data` in the current set. If found, returns `true`, otherwise `false`.