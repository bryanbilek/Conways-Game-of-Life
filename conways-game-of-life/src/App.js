import React from "react";
import "./App.css";
import GridNavBar from "./components/GridNavBar";
import Grid from "./components/Grid";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Conway's Game of Life</h1>
      <GridNavBar />
      <Grid />
      <About />
    </div>
  );
}

export default App;
