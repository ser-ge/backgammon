import React, { Component } from "react";

class Player extends Component {
  // state = { name: "Player 1", connected: false };

  getPlayerCardStyle = (player) => {
    return {
      gridArea: "player",
    };
  };

  // getData = (gameData) => {
  //   console.log(gameData);
  //   this.setState({ ...gameData[this.props.pSign] });
  // };

  // componentDidMount() {
  //   const { socket, pSign, gameId } = this.props;
  //   console.log("player mount --------- player data request sent");
  //   // socket.emit("player_data", gameId);
  //   socket.on("player_data", this.getData);
  // }

  render() {
    const { connected, name } = this.props.player;
    let { turn, pSign } = this.props;
    let isTurn = turn == pSign ? true : false;

    const connectedStyle = connected
      ? "orange-text text-lighten-2"
      : "grey-text text-lighten-1";

    return (
      <div className="card amber lighten-5">
        <div className="card-stacked">
          <div className="card-content">
            <span >
              {" "}
              {name}
            </span>
          </div>
          <div className="card-action">
            <span className={connectedStyle}>
              {connected ? <span className={isTurn ? "light-green-text text-darken-1" : "grey-text"}>turn</span> : "waiting for player"}{" "}
            </span>

          </div>
          {!connected && <div className="progress"><div className="indeterminate"></div></div>}
        </div>
      </div>

      // <div className={"row"}>
      //   <div className={"card-panel amber lighten-5"}>
      //     {name}
      //     <span className={connectedStyle}>
      //       {connected ? (
      //         <span
      //           className={
      //             isTurn ? "light-green-text text-darken-1" : "grey-text"
      //           }
      //         >
      //           turn
      //         </span>
      //       ) : (
      //         "waiting for player"
      //       )}{" "}
      //     </span>
      //   </div>
      // </div>
    );
  }
}

export default Player;
