import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import axios from "axios";
import PlayerPool from "../PlayerPool/PlayerPool.js";
import PlayerSelection from "../PlayerSelection/PlayerSelection.js";
import "./AddPlayers.css";

export default class AddPlayers extends Component {
  state = {
    players: [],
    selectedPlayers: [],
    playerEntry: "",
    error: ""
  };
  onComponentDidMount() {
    // let { players } = this.state;
    // this.refreshPlayers();
  }
  addPlayer = e => {
    if (e.key === "Enter" || e.type === "click") {
      let { players, playerEntry, error } = this.state;
      let playerNames = players.map(player => player.name);
      if (!playerNames.includes(playerEntry) && playerEntry.length > 0) {
        players.push(playerEntry);
        axios
          .post("http://localhost:3001/api/addPlayer", { name: playerEntry })
          .then(response => {
            console.log("Player added", response);
            setTimeout(this.props.refreshPlayers, 500);
            console.log("player added wait");
            // this.setState({ players, playerEntry: "", error });
          })
          .catch(err => console.log("Error adding player: ", err));
        error = "";
      } else {
        error = "Playername already exists";
      }
      this.setState({ players, playerEntry: "", error });
    }
  };
  playerClick = e => {
    let { selectedPlayers } = this.state;
    console.log("selectedPlayers", selectedPlayers);
    let player = e.currentTarget.textContent;
    console.log("player clicked", player);
    if (!selectedPlayers.includes(player)) {
      selectedPlayers.push(player);
      this.setState({ selectedPlayers });
    }
  };
  render() {
    return (
      <div className="grid-container">
        <h1 className="header"> Enter Players </h1>
        <div className="playerInput">
          <Input
            onChange={e => this.setState({ playerEntry: e.target.value })}
            value={this.state.playerEntry}
            placeholder="Add Player"
            onKeyPress={this.addPlayer}
          />
          <Button onClick={this.addPlayer}> Add Player </Button>
          <Button onClick={this.props.refreshPlayers}> Refresh Players </Button>
        </div>
        {this.state.error && (
          <h3 style={{ color: "red" }}> {this.state.error} </h3>
        )}

        {this.state.selectedPlayers.length !== 0 && (
          <PlayerSelection players={this.state.selectedPlayers} />
        )}
        <PlayerPool
          playerClick={this.playerClick.bind(this)}
          players={this.props.players}
        />
      </div>
    );
  }
}
