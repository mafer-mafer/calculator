import React from "react";
import { useState } from "react";
import { CalculatorButtons } from "./CalculatorButtons";
import calc from "./calcFunctions";

export const Calculator = () => {
  const [expression, setExpression] = useState("");

  //Update expression according to typed inputs
  const onChange = (e) => {
    setExpression(e.target.value);
  };

  //Clear if C button is clicked, Del last char if Del is clicked
  //else add value to expression
  const onClick = (e) => {
    if (e.target.value === "C") {
      setExpression("");
    } else if (e.target.value === "Del") {
      setExpression(expression.slice(0, this.state.expression.length - 1));
    } else {
      setExpression(expression + e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setExpression(calc(expression));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="calculator-input-container">
        <label htmlFor="expression"></label>
        <input
          name="expression"
          onChange={onChange}
          value={expression}
          type="text"
        ></input>
      </div>
      <CalculatorButtons onClick={onClick} onSubmit={onSubmit} />
    </form>
  );
};
