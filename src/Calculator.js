import React from "react";

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
    let val = e.target.value;
    let acceptable = "1234567890/+=-C*.()";
    if (acceptable.includes(val[val.length - 1]) || val === "") {
      this.setState({
        expression: val,
      });
    }
  }

  onClick(e) {
    if (e.target.value === "C") {
      this.setState({ expression: "" });
    } else {
      this.setState({
        expression: this.state.expression + e.target.value,
      });
    }
  }

  onSubmit() {
    //
  }

  render() {
    console.log(this.state.expression);
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
              value="C"
              type="reset"
              onClick={this.onClick}
              id="non-number"
            >
              C
            </button>
            <button
              value=""
              type="button"
              onClick={this.onClick}
              id="non-number"
            >
              =
            </button>
          </div>
          {/* <button>(</button>
      <button>)</button> */}
        </div>
      </form>
    );
  }
}
