import React, { Component } from "react";

class Player extends Component {
  state = {name:"Player 1",
           connected: false,
           turn: false
  };

  getPlayerCardStyle = (player) => {
    return {
      gridArea: "player",
    };
  };

  
  getData = (gameData) => {

    console.log(gameData);
    this.setState({ ...gameData[this.props.pSign] });
  };
  
  componentDidMount(){
    const {socket, pSign, gameId} = this.props
    console.log("player mount --------- player data request sent")
    socket.emit("player_data", gameId)
    socket.on("player_data", this.getData)
  }



  render() {


    const {connected, name, turn} = this.state

    const connectedStyle = connected ? "orange-text text-lighten-2" : "grey-text text-lighten-1"

    return (
      <div className="card amber lighten-5" >
        <div className="card-stacked">
          <div className="card-content">
            <span className={turn && "light-green-text text-darken-3"}> {name}</span>
      

          </div>
          <div className="card-action">
            <span className={connectedStyle}>{connected ? "connected" : "waiting for player"} </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
