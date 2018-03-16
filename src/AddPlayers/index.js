import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import axios from "axios";

export default class AddPlayers extends Component {
  state = {
    players: [],
    playerEntry: "",
    error: ""
  };
  addPlayer = e => {
    if (e.key === "Enter" || e.type === "click") {
      let { players, playerEntry, error } = this.state;
      if (!players.includes(playerEntry)) {
        players.push(playerEntry);
        axios
          .post("http://localhost:3001/api/addPlayer", playerEntry)
          .then(response => {
            console.log("Player added");
          })
          .catch(err => console.log("Error adding player: ", err));
        error = "";
      } else {
        error = "Playername already exists";
      }
      this.setState({ players, playerEntry: "", error });
    }
  };
  render() {
    return (
      <div>
        <h1> Enter Players </h1>
        <div style={{ display: "flex" }}>
          <Input
            onChange={e => this.setState({ playerEntry: e.target.value })}
            value={this.state.playerEntry}
            placeholder="Add Player"
            onKeyPress={this.addPlayer}
          />
          <Button onClick={this.addPlayer}> Add Player </Button>
        </div>
        {this.state.error && (
          <h3 style={{ color: "red" }}> {this.state.error} </h3>
        )}
        {this.state.players.map(player => <h1 key={player}> {player} </h1>)}
      </div>
    );
  }
}
