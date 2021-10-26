export default function calc(string) {
  //If string has invalid characters, return Invalid Input
  const regex = /[^0-9*/()\-+.\s+]/g;
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

  //I was previously running the following code in the same loop,
  //nbt thought it might be cleaner to do it in separate loops, if less optimal...
  //Especially since I'm unsure as to how long the input string could really get

  //Check for invalid operator syntax excluding second -
  for (let i = 0; i < string.length; i++) {
    let curr = string[i];
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
  }

  //Use stack to check for parenthesis balance
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "(") {
      parenStack.push(string[i]);
    } else if (string[i] === ")" && parenStack.length > 0) {
      parenStack.pop();
    } else if (string[i] === ")" && !parenStack.length) {
      return "Invalid Syntax";
    }
  }
  //If we still have leftover ( parenthesis it is unbalanced
  if (parenStack.length) {
    return "Invalid Syntax";
  }

  //Add a 0 before decimal points
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "." && isNaN(string[i - 1])) {
      string = string.slice(0, i) + "0" + string.slice(i);
      i++;
    }
  }

  //Function to work on the inside of parenthesis recursively first
  let openIdx = [];
  function parenthesisResolver(string) {
    for (let i = 0; i < string.length; i++) {
      if (string[i] === "(") {
        openIdx.push(i);
      } else if (string[i] === ")") {
        let openParenthIdx = openIdx.pop();
        let subString = string.slice(openParenthIdx + 1, i);
        //Remove parenthesis while solving expression inside of parenthesis
        string =
          string.slice(0, openParenthIdx) +
          loopThrough(subString) +
          string.slice(i + 1);
        i = openParenthIdx;
      }
    }
    return string;
  }

  //Function for dealing with order of operations and beaking down expression
  function loopThrough(string) {
    //setting the order of operations
    operators.order = [
      [[operators.mlt], [operators.div]],
      [[operators.add], [operators.sub]],
    ];

    for (let i = 0; i < operators.order.length; i++) {
      //RegExp for finding the sequence of (-)number(.)(number) -> operator -> (-)number(.)(number)
      let re = new RegExp(
        "(\\-?\\d+\\.?\\d*)([\\" +
          operators.order[i].join("\\") +
          "])(\\-?\\d+\\.?\\d*)"
      );
      //resetting last index to begin search at index 0
      re.lastIndex = 0;
      //  Loop while the specific operator is still existant in string
      while (re.test(string)) {
        //Do the math for the sequence of number/op/number and assign the value to output
        let output = calculate(RegExp.$1, RegExp.$2, RegExp.$3);
        if (isNaN(output) || !isFinite(output)) return output; // exit early if not finite or number
        string = string.replace(re, output); //replace num+operator+num sequence with the output
      }
    }
    return string;
  }

  //Function for actually doing math operations
  function calculate(a, op, b) {
    //ensuring there is a 0 before the decimals and convert to num
    a = parseFloat(a);
    b = parseFloat(b);

    return op === operators.add
      ? a + b
      : op === operators.sub
      ? a - b
      : op === operators.div
      ? a / b
      : op === operators.mlt
      ? a * b
      : "Error";
  }

  //Actually invoke the functions
  string = parenthesisResolver(string);
  return loopThrough(string);
}
