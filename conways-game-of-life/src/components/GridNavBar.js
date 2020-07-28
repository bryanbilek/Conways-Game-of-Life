import React, { useState, useCallback } from "react";

function GridNavBar() {
  const [evolutions, setEvolutions] = useState(false);

  const handleStartStop = () => {
    setEvolutions(!evolutions);
  };

  return (
    <div className="grid-nav-bar">
      <div className="grid-game-buttons">
        <button onClick={handleStartStop}>
          {evolutions ? "stop" : "start"}
        </button>
        {/* <button onClick={handleClear}>Clear</button> */}
      </div>
      {/* <div className="grid-preset-configs">
        <button onClick={preset1}>Preset 1</button>
        <button onClick={preset2}>Preset 2</button>
        <button onClick={preset3}>Preset 3</button>
      </div> */}
    </div>
  );
}

export default GridNavBar;
