import React from "react";

const PlayerSelection = props => {
  console.log("playerSelection props", props);
  return (
    <div className="selectedPlayers">
      {props.players.map(player => {
        return <div className="player">{player}</div>;
      })}
    </div>
  );
};

export default PlayerSelection;
