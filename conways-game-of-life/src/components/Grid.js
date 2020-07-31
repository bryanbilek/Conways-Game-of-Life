import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

let gridRows = 25;
let gridCols = 25;

//setup neighbors to cells
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

//initialize new grid of 0s
const emptyGrid = () => {
  const rows = [];
  for (let i = 0; i < gridRows; i++) {
    rows.push(Array.from(Array(gridCols), () => 0));
  }
  return rows;
};

function Grid() {
  //grid creation in state
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
  //putting generations in state starting at 0
  const [generations, setGenerations] = useState(0);
  //making a ref for evolutions 
  const evolutionsRef = useRef();
  evolutionsRef.current = evolutions;

  const runEvolutions = useCallback(() => {
    if (!evolutionsRef.current) {
      return;
    }
    //produce a new copy of the grid so original remains immutable
    setGrid((grid) => {
      return produce(grid, (gridcopy) => {
        for (let i = 0; i < gridRows; i++) {
          for (let k = 0; k < gridCols; k++) {
            let neighborCells = 0;

            neighborOperations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              //make sure we stay in bounds around the edges of the grid
              if (
                newI >= 0 &&
                newI < gridRows &&
                newK >= 0 &&
                newK < gridCols
              ) {
                neighborCells += grid[newI][newK];
              }
            });
            //conditions for following the rules of the game of life
            if (neighborCells < 2 || neighborCells > 3) {
              gridcopy[i][k] = 0;
            } else if (grid[i][k] === 0 && neighborCells === 3) {
              gridcopy[i][k] = 1;
            }
          }
        }
      });
    });
    //add 1 to the generations count in state also each evolution takes 1 second
    setGenerations((g) => g + 1);
    setTimeout(runEvolutions, 1000);
  }, []);

  const handleSpeedUp = () => {
    return setTimeout(runEvolutions, 200);
  };

  const handleSlowDown = () => {
    return setTimeout(runEvolutions, 2000);
  };

  const handleClear = () => {
    setGrid(emptyGrid());
    setGenerations(0);
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

  const handlePresetPlus = () => {
    if (!evolutions) {
      const newGrid = produce(grid, (gridcopy) => {
        gridcopy[12][13] = grid[12][13] ? 0 : 1;
        gridcopy[12][12] = grid[12][12] ? 0 : 1;
        gridcopy[12][11] = grid[12][11] ? 0 : 1;
        gridcopy[13][12] = grid[13][12] ? 0 : 1;
        gridcopy[11][12] = grid[11][12] ? 0 : 1;
      });
      setGrid(newGrid);
    }
  };

  const handlePresetHello = () => {
    if (!evolutions) {
      const newGrid = produce(grid, (gridcopy) => {
        gridcopy[10][3] = grid[10][3] ? 0 : 1;
        gridcopy[11][3] = grid[11][3] ? 0 : 1;
        gridcopy[12][3] = grid[12][3] ? 0 : 1;
        gridcopy[13][3] = grid[13][3] ? 0 : 1;
        gridcopy[14][3] = grid[14][3] ? 0 : 1;
        gridcopy[12][4] = grid[12][4] ? 0 : 1;
        gridcopy[10][5] = grid[10][5] ? 0 : 1;
        gridcopy[11][5] = grid[11][5] ? 0 : 1;
        gridcopy[12][5] = grid[12][5] ? 0 : 1;
        gridcopy[13][5] = grid[13][5] ? 0 : 1;
        gridcopy[14][5] = grid[14][5] ? 0 : 1;

        gridcopy[10][7] = grid[10][7] ? 0 : 1;
        gridcopy[11][7] = grid[11][7] ? 0 : 1;
        gridcopy[12][7] = grid[12][7] ? 0 : 1;
        gridcopy[13][7] = grid[13][7] ? 0 : 1;
        gridcopy[14][7] = grid[14][7] ? 0 : 1;
        gridcopy[10][8] = grid[10][8] ? 0 : 1;
        gridcopy[12][8] = grid[12][8] ? 0 : 1;
        gridcopy[14][8] = grid[14][8] ? 0 : 1;

        gridcopy[10][10] = grid[10][10] ? 0 : 1;
        gridcopy[11][10] = grid[11][10] ? 0 : 1;
        gridcopy[12][10] = grid[12][10] ? 0 : 1;
        gridcopy[13][10] = grid[13][10] ? 0 : 1;
        gridcopy[14][10] = grid[14][10] ? 0 : 1;
        gridcopy[14][11] = grid[14][11] ? 0 : 1;
        gridcopy[14][12] = grid[14][12] ? 0 : 1;

        gridcopy[10][14] = grid[10][14] ? 0 : 1;
        gridcopy[11][14] = grid[11][14] ? 0 : 1;
        gridcopy[12][14] = grid[12][14] ? 0 : 1;
        gridcopy[13][14] = grid[13][14] ? 0 : 1;
        gridcopy[14][14] = grid[14][14] ? 0 : 1;
        gridcopy[14][15] = grid[14][15] ? 0 : 1;
        gridcopy[14][16] = grid[14][16] ? 0 : 1;

        gridcopy[10][18] = grid[10][18] ? 0 : 1;
        gridcopy[11][18] = grid[11][18] ? 0 : 1;
        gridcopy[12][18] = grid[12][18] ? 0 : 1;
        gridcopy[13][18] = grid[13][18] ? 0 : 1;
        gridcopy[14][18] = grid[14][18] ? 0 : 1;
        gridcopy[10][20] = grid[10][20] ? 0 : 1;
        gridcopy[11][20] = grid[11][20] ? 0 : 1;
        gridcopy[12][20] = grid[12][20] ? 0 : 1;
        gridcopy[13][20] = grid[13][20] ? 0 : 1;
        gridcopy[14][20] = grid[14][20] ? 0 : 1;
        gridcopy[10][19] = grid[10][19] ? 0 : 1;
        gridcopy[14][19] = grid[14][19] ? 0 : 1;
      });
      setGrid(newGrid);
    }
  };

  return (
    <>
      <div className="controls">
        <button onClick={handleStartStop}>
          {evolutions ? "Stop" : "Start"}
        </button>
        <button onClick={handleSpeedUp}>Speed Up!</button>
        <button onClick={handleSlowDown}>Slow Down...</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleRandom}>Random</button>
        <button onClick={handlePresetPlus}>Plus</button>
        <button onClick={handlePresetHello}>'Hello'</button>
      </div>
      <p>Generations: {generations}</p>
      <div
        //creates the grid
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridCols}, 20px)`,
          marginLeft: "5%",
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
                backgroundColor: grid[i][k] ? "red" : undefined,
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
