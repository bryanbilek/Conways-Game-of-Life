import React from "react";

function About() {
  return (
    <div className="About">
      <h1>About Conway's Game of Life</h1>
      <p>
        The Game of Life is a cellular automaton invented by Cambridge
        mathematician John Conway in 1970. It's a game that consists of a
        collection of cells that can live, die or multiply based on a few
        mathematical rules. The game begins after initial state is determined
        and the evolution takes off by itself from there.
      </p>
      <h1>Rules</h1>
      <p>
        At the heart of this game are four rules that determine if a cell is
        live or dead. All depend on how many of that cell's neighbors are alive.
      </p>
      <ul>
        <li>
          Births: Each dead cell adjacent to exactly three live neighbors will
          become live in the next generation
        </li>
        <li>
          Death by isolation: Each live cell with one or fewer live neighbors
          will die in the next generation
        </li>
        <li>
          Death by overcrowding: Each live cell with four or more live neighbors
          will die in the next generation
        </li>
        <li>
          Survival: Each live cell with either two or three live neighbors will
          remain alive for the next generation
        </li>
      </ul>
    </div>
  );
}

export default About;
