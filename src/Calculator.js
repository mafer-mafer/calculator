import React from "react";
import calc from "./Calculations";

export class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      expression: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    //Update expression according to typed inputs
    this.setState({
      expression: e.target.value,
    });
  }

  onClick(e) {
    //Clear if C button is clicked, Del last char if Del is clicked
    //else add value to expression
    if (e.target.value === "C") {
      this.setState({ expression: "" });
    } else if (e.target.value === "Del") {
      this.setState({
        expression: this.state.expression.slice(
          0,
          this.state.expression.length - 1
        ),
      });
    } else {
      this.setState({
        expression: this.state.expression + e.target.value,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ expression: calc(this.state.expression) });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="calculator-input-container">
          <label htmlFor="expression"></label>
          <input
            name="expression"
            onChange={this.onChange}
            value={this.state.expression}
            type="text"
          ></input>
        </div>
        <div className="buttons-container">
          <div className="buttons-row">
            <button
              value="("
              type="button"
              onClick={this.onClick}
              id="non-number"
            >
              (
            </button>
            <button
              value=")"
              type="button"
              onClick={this.onClick}
              id="non-number"
            >
              )
            </button>
            <button
              value="Del"
              type="button"
              id="non-number"
              onClick={this.onClick}
            >
              Del
            </button>

            <button
              value="C"
              type="reset"
              onClick={this.onClick}
              id="non-number"
            >
              C
            </button>
          </div>
          <div className="buttons-row">
            <button value="7" type="button" onClick={this.onClick}>
              7
            </button>
            <button value="8" type="button" onClick={this.onClick}>
              8
            </button>
            <button value="9" type="button" onClick={this.onClick}>
              9
            </button>
            <button
              value="/"
              type="button"
              onClick={this.onClick}
              id="non-number"
            >
              /
            </button>
          </div>
          <div className="buttons-row">
            <button value="4" type="button" onClick={this.onClick}>
              4
            </button>
            <button value="5" type="button" onClick={this.onClick}>
              5
            </button>
            <button value="6" type="button" onClick={this.onClick}>
              6
            </button>
            <button
              value="*"
              type="button"
              onClick={this.onClick}
              id="non-number"
            >
              *
            </button>
          </div>
          <div className="buttons-row">
            <button value="1" type="button" onClick={this.onClick}>
              1
            </button>
            <button value="2" type="button" onClick={this.onClick}>
              2
            </button>
            <button value="3" type="button" onClick={this.onClick}>
              3
            </button>
            <button
              value="-"
              type="button"
              onClick={this.onClick}
              id="non-number"
            >
              -
            </button>
          </div>
          <div className="buttons-row">
            <button value="0" type="button" onClick={this.onClick}>
              0
            </button>
            <button
              value="+"
              type="button"
              onClick={this.onClick}
              id="non-number"
            >
              +
            </button>
            <button
              value="."
              type="button"
              onClick={this.onClick}
              id="non-number"
            >
              .
            </button>
            <button type="submit" id="non-number">
              =
            </button>
          </div>
        </div>
      </form>
    );
  }
}
