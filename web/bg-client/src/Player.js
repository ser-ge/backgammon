import React, { Component } from "react";

class Player extends Component {
  state = {};

  getPlayerCardStyle = (player) => {
    return {
      gridArea: "player",
    };
  };

  render() {
    const player = { name: "Player 1", pSign: 1, self: true, turn: true };

    return (
      <div class="card amber lighten-5" >
        <div class="card-stacked">
          <div class="card-content">
            <span >{player.name}</span>

          </div>
          <div class="card-action">
            <a className={"disable"} href="#">Connected</a>
          </div>
        </div>
      </div>

      // <div style={this.getPlayerCardStyle(player)}>
      //     <img src={"https://img.icons8.com/dusk/64/000000/user.png"} style={{gridRow:"1 / 2", gridColumn:"1"}}/>
      //     <ul style={{gridColumn:"2"}}>
      //     <li>{player.name}</li>
      //     <li >Status: {player.connected ? "Connected" : "Waitting for player"}</li>
      //     </ul>
      // </div>
    );
  }
}

export default Player;
