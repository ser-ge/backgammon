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

  send = (channel, data) => {
    const { socket, gameId, pSign } = this.props;
    socket.emit(channel, { ...data, player_sign: pSign, room: gameId });
  };

  getData = (gameData) => {
    console.log(gameData);
    this.setState({ ...gameData });
  };

  componentDidMount() {
    const { socket, gameId, pSign } = this.props;
    console.log("BOARD ----------- game_data request sent");

    socket.on("game_data", this.getData);
  }

  handlePointClick = (id) => {
    this.send("move", {
      start: id,
      roll: this.state.dice[0],
    });
  };

  handleDiceThrow = () => {
    this.send("roll_dice");
  };

  switchDice = () => {
    this.setState({ dice: this.state.dice.reverse() });
  };

  render() {


    const { points } = this.state;

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
              switchDice={this.switchDice}
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
                  points={points
                    .slice(0, 1)
                    .concat(this.state.points.slice(-1))}
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
