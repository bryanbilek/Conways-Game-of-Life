import React, { useState } from "react";

function Grid() {
  const [generations, setGenerations] = useState(0);

  const handleStart = () => {};

  const handleStop = () => {};

  const handleClear = () => {};

  const preset1 = () => {};

  const preset2 = () => {};

  const preset3 = () => {};

  return (
    <div className="grid">
      <p>Generations: {generations}</p>
      <div className="grid-game-buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <div className="grid-preset-configs">
        <button onClick={preset1}>Preset 1</button>
        <button onClick={preset2}>Preset 2</button>
        <button onClick={preset3}>Preset 3</button>
      </div>
    </div>
  );
}

export default Grid;
