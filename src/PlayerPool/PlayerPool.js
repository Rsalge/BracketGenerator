import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";
export default class PlayerList extends Component {
  render() {
    console.log("players FOR PLAYERLIST", this.props.players);
    return (
      <div style={{ gridArea: "playerPool" }}>
        <h1> Player Pool </h1>
        <ul className="playerPool">
          {this.props.players.map(player => {
            return (
              <li onClick={this.props.playerClick} className="player">
                {player.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
