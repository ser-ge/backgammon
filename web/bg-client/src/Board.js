import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Points from "./Points";
import BearedOff from "./BearedOff";
import Square from "./Point";
import GameIDForm from "./GameIDForm";
import TwoDice from "./TwoDice";
import BarPoints from "./Bar";

export default function Board ({socket, gameId, pSign, gameData, switchDice }) {
 
  // const [gameData, setGameData] = useState(gameData)
  // const [gameData, setGameData] = useState({
  //   points: [],
  //   dice: [,],
  //   move: [],
  //   moves: [],
  //   activeDice: 0,
  //   bearedOff: { "1": [], "-1": [] },
  // })

  const [activeDice, setActiveDice] = useState(0)


  const send = (channel, data) => {
    socket.emit(channel, { ...data, player_sign: pSign, room: gameId });
  };

  const handlePointClick = (id) => {
    send("move", {
      start: id,
      roll: gameData.dice[0],
    });
  };

  const handleDiceThrow = () => {
    send("roll_dice");
  };



  // useEffect(() => {socket.on("game_data", (newGameData) => setGameData({...newGameData}))},[]);




  let top = gameData.points.slice(1, 13).reverse();

  let bottom = gameData.points.slice(13, 25)

  let bar = gameData.points.slice(0, 1).concat(gameData.points.slice(-1))

  const isP = pSign == 1 

  const sections = {
    top : isP ? top : bottom,
    bottom : isP ? bottom : top,
    bar : isP ? bar : bar.reverse()
  } 


  // const { points } = gameData;

  return (
    <div className="board" style={boardStyle}>
      <div className="game-back-board z-depth-4">
        <div className="centre-board">
          <Points
            row={"points-top"}
            points={sections.top}
            handlePointClick={handlePointClick}
            orient={"down"}
          />

          <TwoDice
            dice={gameData.dice}
            handleDiceThrow={handleDiceThrow}
            switchDice={switchDice}
          />

          <Points
            row={"points-bottom"}
            points={sections.bottom}
            handlePointClick={handlePointClick}
            orient={"up"}
          />

          <div className="bar centre">
            <div className="bar-gap">
              <Points
                points={sections.bar}
                handlePointClick={handlePointClick}
                row={"bar"}
              />
            </div>
          </div>
        </div>
      </div>

      <BearedOff bearedOff={gameData.bearedOff} />
    </div>
    );
  }


var boardStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 0.1fr",
  gridTemplateRowsows: "1fr",
  gap: "10px",
  minHeight: "60vh",
  // minWidth: "60vw"
};
