import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Points from "./Points";
import BearedOff from "./BearedOff";
import Square from "./Point";
import GameIDForm from "./GameIDForm";
import TwoDice from "./TwoDice";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      dice: [,],
      game_id: "",
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

  // handleSubmit = (event) => {
  //     event.preventDefault()
  //     this.props.socket.emit('join', this.state.game_id)
  //     this.props.socket.on('join_room', this.getData)
  //     this.setSprops{pSign: -1})

  // }

  getData = (gameData) => {
    console.log(gameData);
    this.setState({ ...gameData });
  };

  componentDidMount() {
    console.log("mount_run");
    this.props.socket.on("game_data", this.getData);
  }

  handlePointClick = (id) => {
    const points = this.state.points.slice();
    this.props.socket.emit("move", {
      player_sign: this.props.pSign,
      start: id,
      roll: this.state.dice[0],
      room: this.state.game_id,
    });
  };

  handleDiceThrow = () => {
    console.log("rolling");
    this.props.socket.emit("roll_dice", {
      player_sign: this.props.pSign,
      room: this.state.game_id,
    });
  };

  render() {
    const status = "Next player: X";
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
              <div className="bar-gap"></div>'' ''
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
