import React, { Component } from "react";
import "./App.css";
import AddPlayers from "./AddPlayers/AddPlayers.js";
import Teams from "./Teams";
import axios from "axios";
class App extends Component {
  state = {
    players: ["ross", "ad"],
    view: "addPlayers"
  };
  componentDidMount() {
    this.refreshPlayers();
    console.log("App refreshed");
  }
  refreshPlayers = () => {
    console.log("refreshing players");
    axios
      .get("http://localhost:3001/api/allPlayers")
      .then(allPlayers => {
        this.setState({ players: allPlayers.data });
      })
      .catch(err => console.log("refresh players error: ", err));
  };
  render() {
    return (
      <div>
        {this.state.view === "addPlayers" && (
          <AddPlayers
            players={this.state.players}
            refreshPlayers={this.refreshPlayers.bind(this)}
          />
        )}
        {this.state.view === "teams" && <Teams players={this.state.players} />}
      </div>
    );
  }
}

export default App;
