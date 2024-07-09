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

const DECIMALPLACES = 5;

const roundTO = (n, decimalPlaces) => {
  // found at https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
  // Answer by Rick Calder - Edit 4 (with exception to parseFloat(n) to avoid displaying unnecessary zeros)
  let negative = false;
  if (n < 0) {
    negative = true;
    n = n * -1;
  }
  let multiplicator = Math.pow(10, decimalPlaces);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = (Math.round(n) / multiplicator).toFixed(decimalPlaces);
  if (negative) {
    n = (n * -1).toFixed(decimalPlaces);
  }
  n = parseFloat(n);
  return n;
}

const operate = (operator, a, b) => {
  a = parseFloat(a), b = parseFloat(b);

  if (operator === addOp) {
    return roundTO(add(a, b), DECIMALPLACES);
  } else if (operator === subtractOp) {
    return roundTO(subtract(a, b), DECIMALPLACES);
  } else if (operator === multiplyOp) {
    return roundTO(multiply(a, b), DECIMALPLACES);
  } else if (operator === divideOp) {
    return roundTO(divide(a, b), DECIMALPLACES);
  }
}

const display = document.querySelector("#display");
const edit = document.querySelector("#edit");
const buttons = document.querySelector("#buttons");
const equals = document.querySelector("#equals");

let isResult = false;

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
      if (event.target.classList.contains("num") && isResult === false) {
        // if target is number, concat n1 with event.target.value
        display.textContent += event.target.value;
        n1 = display.textContent;
        return;
      } else if (event.target.classList.contains("num") && isResult === true) {
        display.textContent = event.target.value;
        n1 = display.textContent;
        isResult = false;
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
    if (n1 && n2 && operator && event.target.classList.contains("arithmetic")) {
      let result = operate(operator, n1, n2);
      display.textContent = result;
      n1 = result;
      
      display.textContent += " " + event.target.value + " ";
      operator = event.target.value;
      
      n2 = null;

      return;
    }
  }
})

equals.addEventListener("click", () => {
  // update display with result for operate function
  let result = operate(operator, n1, n2);
  display.textContent = result;
  n1 = result;
  
  operator = n2 = null;

  isResult = true;
  return;
})

edit.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {
    if (event.target.value === "clear") {
      display.textContent = "0";
      n1 = n2 = operator = null;
      return;
    } else if (event.target.value === "delete") {
      // delete next character from display
      if (display.textContent.slice(-1) === " ") {
        // when next character to be deleted is a space, delete the next 3 characters (ex. space, operator, space)
        display.textContent = display.textContent.slice(0, -3);
        operator = null;
      } else {
        display.textContent = display.textContent.slice(0, -1);
      }

      let array = display.textContent.split(" ");

      if (array[0] === "") {
        // when the last digit of n1 has been deleted
        n1 = null;
        display.textContent = "0";
      } else if (array[2] === "") {
        // when the last digit of n2 has been deleted
        n2 = null;
      } else if (array.length === 1) {
        // when a digit from n1 has been deleted
        n1 = array[array.length - 1];
      } else if (array.length === 3) {
        // when a digit from n2 has been deleted
        n2 = array[array.length - 1];
      }

      return;
    }
  }
})

// TODO: display snarky message if dividing by zero
// TODO: EXTRA CREDIT prevent more than one decimal in a number
// TODO: EXTRA CREDIT add keyboard support