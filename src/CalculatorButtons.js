import React from "react";

export const CalculatorButtons = (props) => {
  const onClick = props.onClick;
  return (
    <div className="buttons-container">
      <div className="buttons-row">
        <button value="(" type="button" onClick={onClick} id="non-number">
          (
        </button>
        <button value=")" type="button" onClick={onClick} id="non-number">
          )
        </button>
        <button value="Del" type="button" id="non-number" onClick={onClick}>
          Del
        </button>

        <button value="C" type="reset" onClick={onClick} id="non-number">
          C
        </button>
      </div>
      <div className="buttons-row">
        <button value="7" type="button" onClick={onClick}>
          7
        </button>
        <button value="8" type="button" onClick={onClick}>
          8
        </button>
        <button value="9" type="button" onClick={onClick}>
          9
        </button>
        <button value="/" type="button" onClick={onClick} id="non-number">
          /
        </button>
      </div>
      <div className="buttons-row">
        <button value="4" type="button" onClick={onClick}>
          4
        </button>
        <button value="5" type="button" onClick={onClick}>
          5
        </button>
        <button value="6" type="button" onClick={onClick}>
          6
        </button>
        <button value="*" type="button" onClick={onClick} id="non-number">
          *
        </button>
      </div>
      <div className="buttons-row">
        <button value="1" type="button" onClick={onClick}>
          1
        </button>
        <button value="2" type="button" onClick={onClick}>
          2
        </button>
        <button value="3" type="button" onClick={onClick}>
          3
        </button>
        <button value="-" type="button" onClick={onClick} id="non-number">
          -
        </button>
      </div>
      <div className="buttons-row">
        <button value="0" type="button" onClick={onClick}>
          0
        </button>
        <button value="+" type="button" onClick={onClick} id="non-number">
          +
        </button>
        <button value="." type="button" onClick={onClick} id="non-number">
          .
        </button>
        <button type="submit" id="non-number">
          =
        </button>
      </div>
    </div>
  );
};
