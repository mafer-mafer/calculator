import "./App.css";
import React from "react";
import { Calculator } from "./Calculator";

const App = () => {
  return (
    <div className="App">
      <div className="inner-div">
        <h3>Simple Calculator</h3>
        <Calculator />
      </div>
    </div>
  );
};

export default App;
