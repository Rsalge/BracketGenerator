import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import axios from "axios";
import PlayerPool from "../PlayerPool/PlayerPool.js";
import PlayerSelection from "../PlayerSelection/PlayerSelection.js";
import "./AddPlayers.css";

export default class AddPlayers extends Component {
  constructor(props) {
    super(props);
    console.log("AddPlayers players prop", props.players);
    this.state = {
      playerPool: [],
      selectedPlayers: [],
      playerEntry: "",
      error: ""
    };
  }
  componentWillReceiveProps(props) {
    console.log("WHEN IS THIS CALLED?");
    this.setState({ playerPool: props.players });
  }
  addPlayer = e => {
    if (e.key === "Enter" || e.type === "click") {
      let { playerPool, playerEntry, error } = this.state;
      let playerNames = playerPool.map(player => player.name);
      if (!playerNames.includes(playerEntry) && playerEntry.length > 0) {
        playerPool.push(playerEntry);
        axios
          .post("http://localhost:3001/api/addPlayer", { name: playerEntry })
          .then(response => {
            console.log("Player added", response);
            //this is necessary due to Async, otherwise players don't automatically update when added
            setTimeout(this.props.refreshPlayers, 500);
          })
          .catch(err => console.log("Error adding player: ", err));
        error = "";
      } else {
        error = "Playername already exists";
      }
      this.setState({ playerPool, playerEntry: "", error });
    }
  };
  playerClick = (i, playerName, e) => {
    let { selectedPlayers, playerPool } = this.state;
    console.log("selectedPlayers", selectedPlayers);
    let player = e.currentTarget.textContent;
    let playerIndex = e.currentTarget.index;
    console.log(
      "player index",
      playerIndex,
      "\n\ne.currentTarget: ",
      e.currentTarget,
      "\n\n"
    );
    playerPool.splice(playerIndex, 1);
    console.log("new player pool", playerPool);
    selectedPlayers.push(player);
    this.setState({ selectedPlayers, playerPool });
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
          players={this.state.playerPool}
        />
      </div>
    );
  }
}
