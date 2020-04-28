import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Points from "./Points";
import BearedOff from "./BearedOff";
import Square from "./Point";
import GameIDForm from "./GameIDForm";
import TwoDice from "./TwoDice";
import BarPoints from "./Bar";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      dice: [,],
      move: [],
      moves: [],
      activeDice: 0,
      bearedOff: { "1": [], "-1": [] },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ game_id: event.target.value });
  };


  getData = (gameData) => {
    console.log(gameData);
    this.setState({ ...gameData });
  };

  componentDidMount() {
    const {socket, gameId, pSign} = this.props
    console.log("BOARD ----------- game_data request sent");
    socket.emit("game_data", gameId)
    socket.on("game_data", this.getData);
  }

  // componentDidUpdate(){
  //   this.props.socket.on("game_data", this.getData);
  // }

  handlePointClick = (id) => {
    const {socket, gameId, pSign} = this.props
    const points = this.state.points.slice();
    socket.emit("move", {
      player_sign: pSign,
      start: id,
      roll: this.state.dice[0],
      room: gameId,
    });
  };

  handleDiceThrow = () => {
    const {socket, gameId, pSign} = this.props
    console.log("rolling");
    socket.emit("roll_dice", {
      player_sign: pSign,
      room: gameId,
    });
  };

  render() {
    const status = "Next player: X";

    const {points} = this.state

    return (
      <div className="board" style={boardStyle}>
        <div className="game-back-board z-depth-4">
          <div className="centre-board">
            <Points
              row={"points-top"}
              points={this.state.points.slice(1, 13).reverse()}
              handlePointClick={this.handlePointClick}
              orient={"down"}
            />

            <TwoDice
              dice={this.state.dice}
              handleDiceThrow={this.handleDiceThrow}
            />

            <Points
              row={"points-bottom"}
              points={this.state.points.slice(13, 25)}
              handlePointClick={this.handlePointClick}
              orient={"up"}
            />

            <div className="bar centre">
              <div className="bar-gap">
                <Points
                  points={points.slice(0,1).concat(this.state.points.slice(-1))}
                  handlePointClick={this.handlePointClick}
                  row={"bar"}
                />
              </div>
            </div>
          </div>
        </div>

        <BearedOff bearedOff={this.state.bearedOff} />
      </div>
    );
  }
}

var boardStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 0.1fr",
  gridTemplateRowsows: "1fr",
  gap: "10px",
  minHeight: "60vh",
  // minWidth: "60vw"
};
