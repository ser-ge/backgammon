import Board from "./Board";
import React, { Component, Fragment } from "react";
import NewGameButton from "./NewGameButton";
import GameIDForm from "./GameIDForm";
import Player from "./Player";

class Game extends Component {
  constructor(props) {
    super(props);

    const {
      socket,
      match: { params },
    } = this.props;

    if (this.props.gameId === undefined) {
      socket.emit("join", params.game_id);
      console.log("GAME ---------- gameID set")
    }

    this.state = {
      isLoading: false,
      gameId: params.game_id,
    };


  }

  getData = (gameData) => {
    console.log(gameData);
    this.setState({ ...gameData });
  };

  
  componentDidMount() {
    console.log("mount_run");
    const {
      socket,
      match: { params },
      pSign,
    } = this.props;

    // const {gameId} = this.state

    // if (gameId === undefined) {
    //   socket.emit("join", params.game_id);
    // }
    socket.on("join", this.getData);
    socket.on("game_data", this.getData)
    socket.emit("game_data", this.props.gameId)
    // socket.emit("player_data", gameId);
    // socket.on("player_data", this.getData);

  }




  render() {
    const { socket , pSign, match: { params } } = this.props;
    const { players, gameId, isLoading, opSign, turn } = this.state;
    return (
      <Fragment>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <Fragment>
            <div className={"row"}>
              <div className={"col s2"}>
                <div style={{ height: "45vh" }}> </div>
                <Player socket={socket} turn={turn} pSign={pSign} gameId={params.game_id}/>
              </div>

              <div className={"col s8"}>
                <Board gameId={params.game_id} pSign={pSign} socket={socket} />
              </div>

              <div className={"col s2"}>
              <Player socket={socket} turn={turn} pSign={pSign * -1} gameId={params.game_id}/>
              </div>
            </div>
            <div className="row">
            <NewGameButton socket={socket} gameId={gameId} />
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

var gamePageStyle = {
  display: "grid",
  height: "100vh",
  backgroundColor: "#096046",
  gridTemplateRows: "repeat(2,auto) repeat(3, auto) 0.2fr",
  gap: "10px",
  gridTemplateColumns: "repeat(2,0.5fr) repeat(3,1fr) repeat(2, 0.4fr) 0.2fr",
  gridTemplateAreas: ` "hd hd    hd    hd        hd    hd   hd   hd"
                          ".  .     .     op-player .     .    .    . "      
                          ".  sd    board board     board .    chat . "
                          ".  sd    board board     board .    chat . "
                          ".  sd    board board     board .    chat . "
                          ".  .     player    player    player     .    .    . "      
                        `,
};

var sideBarButtonStyle = {
  gridArea: "sd",
};

export default Game;
