// Operator functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// User input
let n1 = null;
let operator = null;
let n2 = null;

// debugging purposes only
// n1 = 2;
// n2 = 3;

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

const display = document.querySelector("#display");
const edit = document.querySelector("#edit");
const buttons = document.querySelector("#buttons");
const equals = document.querySelector("#equals");

buttons.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {

    // if n1 is null, only respond to numbers
    if (n1 === null) {
      if (event.target.classList.contains("num")) {
        display.textContent = event.target.value;
        n1 = display.textContent;
        return;
      }
    }

    // if n1 is equal to number (or string) allow operators except for "equals"
    if (operator === null) {
      if (event.target.classList.contains("num")) {
        // if target is number, concat n1 with event.target.value
        display.textContent += event.target.value;
        n1 = display.textContent;
        return;
      } else if (event.target.classList.contains("arithmetic")) {
        // if target is operator, assign operator to event.target.value
        display.textContent += " " + event.target.value + " ";
        operator = event.target.value;
        return;
      }
    }

    // if operator is not equal to null, have next numbers add values to n2
    if (n2 === null) {
      if (event.target.classList.contains("num")) {
        display.textContent += event.target.value;
        n2 = event.target.value;
        return;
      }
    } else {
      if (event.target.classList.contains("num")) {
        display.textContent += event.target.value;
        array = display.textContent.split(" ");
        n2 = array[array.length-1];
        return;
      }
    }

    // if arithmetic operator is clicked when n1, n2, and operator != null 
    // (operate current values and assign result to n1 and set operator to value of button clicked)
  }
})

equals.addEventListener("click", () => {
  // update display with result for operate function
  result = operate(operator, parseInt(n1), parseInt(n2));
  display.textContent = result;
  n1 = result;
  
  operator = n2 = null;
  return;
})

// edit event listener