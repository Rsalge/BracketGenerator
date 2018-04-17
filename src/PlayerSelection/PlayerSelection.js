import React from "react";

const PlayerSelection = props => {
  console.log("playerSelection props", props);
  return (
    <div style={{ gridArea: "selectedPlayers" }}>
      <h1> Selected Players </h1>
      <ul className="selectedPlayers">
        {props.players.map(player => {
          return <li className="player">{player}</li>;
        })}
      </ul>
    </div>
  );
};

export default PlayerSelection;
