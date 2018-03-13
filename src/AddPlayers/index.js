import React, { Component } from "react";
import { Input } from "semantic-ui-react";

export default class AddPlayers extends Component {
  state = {
    players: [],
    playerEntry: "",
    error: ""
  };
  render() {
    return (
      <div>
        <h1> Hello </h1>
        <Input
          onChange={e => this.setState({ playerEntry: e.target.value })}
          value={this.state.playerEntry}
          placeholder="Add Player"
          onKeyPress={e => {
            if (e.key === "Enter") {
              let { players } = this.state;
              players.push(e.target.value);
              this.setState({ players });
            }
          }}
        />
        {this.state.players.map(player => <h1> {player} </h1>)}
      </div>
    );
  }
}
