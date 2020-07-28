import React, { useState } from "react";
import produce from "immer";

let gridRows = 25;
let gridCols = 25;

function Grid() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < gridRows; i++) {
      rows.push(Array.from(Array(gridCols), () => 0));
    }
    return rows;
  });
  const [generations, setGenerations] = useState(0);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridCols}, 20px)`,
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div
            key={`{i}-{k}`}
            onClick={() => {
              const newGrid = produce(grid, (gridcopy) => {
                gridcopy[i][k] = grid[i][k] ? 0 : 1;
              });
              setGrid(newGrid);
            }}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[i][k] ? "black" : undefined,
              border: "1px solid red",
            }}
          />
        ))
      )}
    </div>
  );
}

export default Grid;
