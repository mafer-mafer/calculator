import React from "react";

export class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      expression: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    let val = e.target.value;
    let acceptable = "1234567890/+=*"; //come back to this
    if (acceptable.includes(val[val.length - 1]) || val === "") {
      this.setState({
        expression: val,
      });
    }
  }

  onSubmit() {
    //
  }

  render() {
    return (
      <div className="calculator-container">
        <form onSubmit={this.onSubmit}>
          <div id="calculator-input-container">
            <label htmlFor="expression"></label>
            <input
              name="expression"
              onChange={this.onChange}
              value={this.state.expression}
              type="text"
            ></input>
          </div>
          <div>
            <button value="7" type="button" onClick={this.onChange}>
              7
            </button>
            <button value="8" type="button" onClick={this.onChange}>
              8
            </button>
            <button value="9" type="button" onClick={this.onChange}>
              9
            </button>
            <button value="/" type="button" onClick={this.onChange}>
              /
            </button>
          </div>
          <div>
            <button value="4" type="button" onClick={this.onChange}>
              4
            </button>
            <button value="5" type="button" onClick={this.onChange}>
              5
            </button>
            <button value="6" type="button" onClick={this.onChange}>
              6
            </button>
            <button value="*" type="button" onClick={this.onChange}>
              *
            </button>
          </div>
          <div>
            <button value="1" type="button" onClick={this.onChange}>
              1
            </button>
            <button value="2" type="button" onClick={this.onChange}>
              2
            </button>
            <button value="3" type="button" onClick={this.onChange}>
              3
            </button>
            <button value="-" type="button" onClick={this.onChange}>
              -
            </button>
          </div>
          <div>
            <button value="0" type="button" onClick={this.onChange}>
              0
            </button>
            <button value="+" type="button" onClick={this.onChange}>
              +
            </button>
            <button value="" type="button" onClick={this.onChange}>
              Enter
            </button>
          </div>
          {/* <button>(</button>
      <button>)</button> */}
        </form>
      </div>
    );
  }
}
