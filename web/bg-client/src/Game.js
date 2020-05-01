import Board from "./Board";
import React, { useState, useEffect, Component, Fragment } from "react";
import NewGameButton from "./NewGameButton";
import GameIDForm from "./GameIDForm";
import Player from "./Player";

export default function Game({
  newGameId,
  pSignProp,
  socket,
  match: { params },
}) {
  const [gameData, setGameData] = useState({
    pSign: pSignProp,
    dice: [],
    doubleDiceOwner : [],
    winner : [],
    gameId: newGameId,
    points : [],
    bearedOff: {1:1, "-1": 1},
    score : [],
    gamePoints : [],
    players: {
      "1": {
        connected: false,
        name: "Player 1",
        connected: false,
        sign: 1
      },
      "-1": {
        connected: false,
        name: "Player 2",
        connected: false,
        sign: -1
      },
    },
    turn: 1,
  });

  const [isLoading, setLoaded] = useState(true);


  const joinUrl = "http://localhost:5000/join_game?game_id=" + params.game_id;
  console.log(joinUrl);



  const joinGame = (data) => {
    setGameData({ ...gameData, ...data });

  };
  const resumeGame = () => {
    socket.emit("game_data")
  }

  const switchDice = () => {
    setGameData({ ...gameData, dice: gameData.dice.reverse() });
  };

  const updateGame = (updatedGameData) => {
    setGameData({ ...gameData, ...updatedGameData });
    setLoaded(false);
  };
  useEffect(() => {
    const { gameId } = gameData;
    socket.on("game_data", (updatedGameData) => updateGame(updatedGameData));

    if (newGameId === undefined) {
      fetch(joinUrl, { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((data) => joinGame(data));
    }

    socket.emit("join", { gameId: params.game_id });

  }, []);

 

  const { players, opSign, turn, pSign } = gameData;

  if (isLoading) {
    return (
      <div className="preloader-wrapper active">
      <div className="spinner-layer spinner-red-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
    )
  } else {
    return (
      <Fragment>
        <div className={"row"}>
          <div className={"col s2"}>
            <div style={{ height: "45vh" }}> </div>
            <Player
              socket={socket}
              turn={turn}
              pSign={pSign}
              gameId={params.game_id}
              player={players[1]}
            />
          </div>

          <div className={"col s8"}>
            <Board
              gameId={params.game_id}
              pSign={pSign}
              socket={socket}
              gameData={gameData}
              switchDice={switchDice}
            />
          </div>

          <div className={"col s2"}>
            <Player
              socket={socket}
              turn={turn}
              pSign={pSign * -1}
              gameId={params.game_id}
              player={players["-1"]}
            />
          </div>
        </div>
        <div className="row">
          <NewGameButton socket={socket} gameId={params.game_id} />
        </div>
      </Fragment>
    );
  }
}
