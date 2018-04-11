import React, { Component } from "react";

export default class Teams extends Component {
  state = {
    teams: []
  };
  generateTeams() {
    console.log("generate teams");
  }
  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <input type="number" min="2" max="16" />
          <button onClick={this.generateTeams}> Generate Teams </button>
        </div>
        <div>
          {this.props.players.map(player => {
            return <h3 key={player}> {player} </h3>;
          })}
        </div>
      </div>
    );
  }
}
