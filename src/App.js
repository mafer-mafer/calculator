import "./App.css";
import React from "react";
import { Calculator } from "./Calculator";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Simple Calculator</h2>
      </header>
      <Calculator />
    </div>
  );
};

export default App;
