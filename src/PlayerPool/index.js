import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";
export default class PlayerList extends Component {
  render() {
    console.log("players FOR PLAYERLIST", this.props.players);
    return (
      <div className="playerPool">
        {this.props.players.map(player => {
          return (
            <div onClick={this.props.playerClick} className="player">
              {player}
            </div>
          );
        })}
      </div>
    );
  }
}
