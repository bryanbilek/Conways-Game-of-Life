import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

let gridRows = 25;
let gridCols = 25;

const neighborOperations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const emptyGrid = () => {
  const rows = [];
  for (let i = 0; i < gridRows; i++) {
    rows.push(Array.from(Array(gridCols), () => 0));
  }
  return rows;
};

function Grid() {
  //grid creation
  const [grid, setGrid] = useState(() => {
    return emptyGrid();
  });

  //setting state for each evolution
  const [evolutions, setEvolutions] = useState(false);

  const handleStartStop = () => {
    setEvolutions(!evolutions);
    if (!evolutions) {
      evolutionsRef.current = true;
      runEvolutions();
    }
  };

  const [generations, setGenerations] = useState(0);

  const evolutionsRef = useRef();
  evolutionsRef.current = evolutions;

  const runEvolutions = useCallback(() => {
    if (!evolutionsRef.current) {
      return;
    }

    setGrid((grid) => {
      return produce(grid, (gridcopy) => {
        for (let i = 0; i < gridRows; i++) {
          for (let k = 0; k < gridCols; k++) {
            let neighborCells = 0;

            neighborOperations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;

              if (
                newI >= 0 &&
                newI < gridRows &&
                newK >= 0 &&
                newK < gridCols
              ) {
                neighborCells += grid[newI][newK];
              }
            });

            if (neighborCells < 2 || neighborCells > 3) {
              gridcopy[i][k] = 0;
            } else if (grid[i][k] === 0 && neighborCells === 3) {
              gridcopy[i][k] = 1;
            }
          }
        }
      });
    });
    setGenerations(g => g + 1)
    setTimeout(runEvolutions, 1000);
  }, []);

  const handleClear = () => {
    setGrid(emptyGrid());
    setGenerations(0)
  };

  const handleRandom = () => {
    const rows = [];
    for (let i = 0; i < gridRows; i++) {
      rows.push(
        Array.from(Array(gridCols), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }
    setGrid(rows);
  };

  return (
    <>
      <button onClick={handleStartStop}>{evolutions ? "Stop" : "Start"}</button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleRandom}>Random</button>
      <div>Generations: {generations}</div>
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
                if (!evolutions) {
                  const newGrid = produce(grid, (gridcopy) => {
                    gridcopy[i][k] = grid[i][k] ? 0 : 1;
                  });
                  setGrid(newGrid);
                } else {
                  return;
                }
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
    </>
  );
}

export default Grid;
