// Operator functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// User input
let n1;
let op;
let n2;

// debugging purposes only
n1 = 2;
n2 = 3;

// Operator characters
const addOp = "+";
const subtractOp = "-";
const multiplyOp = "x";
const divideOp = "/";

const operate = (operator, a, b) => {
    if (operator === addOp) {
        return add(a, b);
    } else if (operator === subtractOp) {
        return subtract(a, b);
    } else if (operator === multiplyOp) {
        return multiply(a, b);
    } else if (operator === divideOp) {
        return divide(a, b);
    }
}