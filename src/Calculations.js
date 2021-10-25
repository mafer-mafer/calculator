export default function calc(string) {
  let output;
  let operators = {
    add: "+",
    sub: "-",
    div: "/",
    mlt: "*",
  };
  let parenthesis = {
    left: "(",
    right: ")",
  };
  //setting the order of operations
  operators.order = [
    [operators.mlt],
    [operators.div],
    [operators.add],
    [operators.sub],
  ];

  for (let i = 0; i < string.length; i++) {
    if (string[i] === "." && isNaN(string[i - 1])) {
      string = string.slice(0, i) + "0" + string.slice(i);
    }
  }
  console.log(string);
  loopThrough(string);

  function loopThrough(string) {
    let n = operators.order.length;

    for (let i = 0; i < n; i++) {
      // Checking for operators in between numbers or floats
      let re = new RegExp(
        "(\\d+\\.?\\d*)([\\" +
          operators.order[i].join("\\") +
          "])(\\d+\\.?\\d*)"
      );
      //resetting last index to begin search at index 0
      re.lastIndex = 0;
      //  Loop while the specific operator is still existant in string
      while (re.test(string)) {
        output = calculate(RegExp.$1, RegExp.$2, RegExp.$3);
        if (isNaN(output) || !isFinite(output)) return output; // exit early if not a number
        string = string.replace(re, output); //replace num/operator/num with the output
      }
    }
  }

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
      : "";
  }
  return output;
}
