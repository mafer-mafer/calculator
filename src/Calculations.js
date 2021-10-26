export default function calc(string) {
  let output;

  //If it has invalid characters, return Invalid Input
  const regex = /[^0-9*\/()\-+.\s+]/g;
  if (regex.test(string)) {
    return "Invalid Input";
  }

  //Remove spaces from string
  string = string.replace(/\s+/g, "");

  //If no operators, return the same number back
  if (
    !string.includes("+") &&
    !string.includes("-") &&
    !string.includes("/") &&
    !string.includes("*")
  ) {
    return string;
  }

  let operators = {
    add: "+",
    sub: "-",
    div: "/",
    mlt: "*",
  };
  let operatorStack = [];
  let parenStack = [];

  //Unsure if it's better to break this down into several specialized loops rather than just one
  for (let i = 0; i < string.length; i++) {
    let curr = string[i];

    //Check for invalid operator syntax excluding first -
    let isOp = "+-/*".includes(curr);
    let theLength = operatorStack.length;
    let isNeg = curr === "-";
    if ((theLength === 1 && isOp && !isNeg) || (theLength === 2 && isOp)) {
      return "Invalid Syntax";
    } else if ((theLength === 1 && isNeg) || (theLength === 0 && isOp)) {
      operatorStack.push(curr);
    } else if (!isOp) {
      while (operatorStack.length) {
        operatorStack.pop();
      }
    }

    //Use stack to check for parenthesis balance
    if (curr === "(") {
      parenStack.push(curr);
    } else if (curr === ")" && parenStack.length > 0) {
      parenStack.pop();
    } else if (curr === ")" && !parenStack.length) {
      return "Invalid Syntax";
    }

    //Add a 0 before decimal points
    if (curr === "." && isNaN(string[i - 1])) {
      string = string.slice(0, i) + "0" + string.slice(i);
    }
  }

  //If we still have leftover parenthesis it is unbalanced
  if (parenStack.length) {
    return "Invalid Syntax";
  }

  let openIdx = [];
  //Work on parenthesis first recursively
  function parenthesisResolver(string) {
    for (let i = 0; i < string.length; i++) {
      if (string[i] === "(") {
        openIdx.push(i);
      } else if (string[i] === ")") {
        let openParenthIdx = openIdx.pop();
        let subString = string.slice(openParenthIdx + 1, i);
        string =
          string.slice(0, openParenthIdx) +
          loopThrough(subString) +
          string.slice(i + 1);
        i = 0;
      }
    }
    return string;
  }

  string = parenthesisResolver(string);
  return loopThrough(string);

  function loopThrough(string) {
    //setting the order of operations
    operators.order = [
      [[operators.mlt], [operators.div]],
      [[operators.add], [operators.sub]],
    ];

    for (let i = 0; i < operators.order.length; i++) {
      let re = new RegExp(
        "(\\-?\\d+\\.?\\d*)([\\" +
          operators.order[i].join("\\") +
          "])(\\-?\\d+\\.?\\d*)"
      );
      //resetting last index to begin search at index 0
      re.lastIndex = 0;
      //  Loop while the specific operator is still existant in string
      while (re.test(string)) {
        output = calculate(RegExp.$1, RegExp.$2, RegExp.$3);
        if (isNaN(output) || !isFinite(output)) return output; // exit early if not a finite or number
        string = string.replace(re, output); //replace num+operator+num with the output
      }
    }
    return string;
  }

  function calculate(a, op, b) {
    let result;

    //The following is needed to try to curve Javascript's difficulty with decimals/frames
    let neededDecimalsPlaces = 0;

    if (a.includes(".")) {
      let idx = a.indexOf(".");
      neededDecimalsPlaces = a.length - (idx + 1);
    }

    if (b.includes(".")) {
      let idx = b.indexOf(".");
      if (b.length - (idx + 1) > neededDecimalsPlaces) {
        neededDecimalsPlaces = b.length - (idx + 1);
      }
    }

    if (neededDecimalsPlaces > 0) {
      a = a * (10 ^ neededDecimalsPlaces);
      b = b * (10 ^ neededDecimalsPlaces);
    }

    //ensuring there is a 0 before the decimals and convert to num
    a = parseFloat(a);
    b = parseFloat(b);

    op === operators.add
      ? (result = a + b)
      : op === operators.sub
      ? (result = a - b)
      : op === operators.div
      ? (result = a / b)
      : op === operators.mlt
      ? (result = a * b)
      : (result = "Error");

    if (neededDecimalsPlaces > 0) {
      return result / (10 ^ neededDecimalsPlaces);
    } else {
      return result;
    }
  }
}
