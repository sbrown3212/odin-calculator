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
      if (event.target.classList.contains("num") && isResult === true) {
        // if display is a result and user clicks new number, delete result and save new number as n1 (to avoid concatenating numbers to a result from previous operation)
        display.textContent = event.target.value;
        n1 = display.textContent;
        isResult = false;
        return;
      } else if (event.target.value === "." && isResult === false && n1.includes(".")) {
        // do nothing if n1 already has a decimal
        return;
      } else if (event.target.classList.contains("num") && isResult === false) {
        // if target is number, concat n1 with button value
        display.textContent += event.target.value;
        n1 = display.textContent;
        return;
      } else if (event.target.classList.contains("arithmetic")) {
        // if target is operator, assign operator to button value
        display.textContent += " " + event.target.value + " ";
        operator = event.target.value;
        return;
      }
    }

    // if n1 and operator have been assigned
    if (n2 === null) {
      if (event.target.classList.contains("num")) {
        // if n2 has no value assigned yet
        display.textContent += event.target.value;
        n2 = event.target.value;
        return;
      }
    } else {
      if (event.target.value === "." && n2.includes(".")) {
        // prevent more than one decimal in n2
        return;
      } else if (event.target.classList.contains("num")) {
        // concatenate button value to end of n2
        display.textContent += event.target.value;
        array = display.textContent.split(" ");
        n2 = array[array.length-1];
        return;
      }
    }

    // if arithmetic operator is clicked when n1, n2, and operator have been assigned
    if (n1 && n2 && operator && event.target.classList.contains("arithmetic")) {
      if (operator === divideOp && n2 === "0") {
        // prevent divide by zero
        alert("Can't divide by zero!");
        n1 = n2 = operator = null;
        display.textContent = "0";
        return;
      }
      // operate, update display, and save result to n1
      let result = operate(operator, n1, n2);
      display.textContent = result;
      n1 = result;
      
      // assign operator based on value of button clicked
      display.textContent += " " + event.target.value + " ";
      operator = event.target.value;
      
      n2 = null;

      return;
    }
  }
})

equals.addEventListener("click", () => {
  if (operator === divideOp && n2 === "0") {
    // prevent divide by zero
    alert("Can't divide by zero!");
    n1 = n2 = operator = null;
    display.textContent = "0";
    return;
  }
  // operate, update display, and save result to n1
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
      // clear display and assign all values to null
      display.textContent = "0";
      n1 = n2 = operator = null;
      return;
    } else if (event.target.value === "delete") {
      // delete next character from display
      if (display.textContent.slice(-1) === " ") {
        // delete operator and spaces on either side
        display.textContent = display.textContent.slice(0, -3);
        operator = null;
      } else {
        // delete last character
        display.textContent = display.textContent.slice(0, -1);
      }

      let array = display.textContent.split(" ");

      if (array[0] === "") {
        // set n1 to null and set display to "0" when last digit of n1 is deleted
        n1 = null;
        display.textContent = "0";
      } else if (array[2] === "") {
        // set n2 to null when last digit of n2 is deleted
        n2 = null;
      } else if (array.length === 1) {
        // update n1
        n1 = array[array.length - 1];
      } else if (array.length === 3) {
        // update n2
        n2 = array[array.length - 1];
      }

      return;
    }
  }
})

// TODO: EXTRA CREDIT add keyboard support