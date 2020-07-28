import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Conway's Game of Life</h1>
      <Grid />
      <About />
    </div>
  );
}

export default App;
