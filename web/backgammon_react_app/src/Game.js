import Board from "./Board";
import React, { useState, useEffect, Component, Fragment } from "react";
import NewGameButton from "./NewGameButton";
import GameIDForm from "./GameIDForm";
import Player from "./Player";
import Chat from "./Chat";

export default function Game({
  newGameId,
  pSignProp,
  socket,
  match: { params },
  handleNewGameClick,
}) {
  const [gameData, setGameData] = useState({
    // pSign: pSignProp,
    // dice: [],
    // doubleDiceOwner: [],
    // winner: [],
    // gameId: newGameId,
    // points: [],
    // bearedOff: { 1: 1, "-1": 1 },
    // score: [],
    // gamePoints: [],
    // players: {
    //   "1": {
    //     connected: false,
    //     name: "Player 1",
    //     connected: false,
    //     sign: 1,
    //   },
    //   "-1": {
    //     connected: false,
    //     name: "Player 2",
    //     connected: false,
    //     sign: -1,
    //   },
    // },
    // turn: 1,
  });

  const [isLoading, setLoaded] = useState(true);
  const [chat, showChat] = useState(true);
  const [gameId, setGameId] = useState(newGameId);
  const [pSign, setpSign] = useState(pSignProp);

  const joinUrl = "/api/join_game?game_id=" + params.game_id;
  console.log(joinUrl);

  const joinGame = (data) => {
    console.log("Fetching Data");
    console.log(data);
    setGameData({ ...gameData, ...data });
    setpSign(data.pSign);
    setGameId(data.gameId);
  };
  const resumeGame = () => {
    socket.emit("game_data");
  };

  const switchDice = () => {
    setGameData({ ...gameData, dice: gameData.dice.reverse() });
  };

  const updateGame = (updatedGameData) => {
    setGameData({ ...gameData, ...updatedGameData });

    setLoaded(false);
  };
  useEffect(() => {
    const { gameId } = gameData;

    if (newGameId === undefined) {
      fetch(joinUrl, { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((data) => joinGame(data))
        .then(() => setLoaded(false));
    }

    socket.emit("join", { gameId: params.game_id });
    socket.on("game_data", (updatedGameData) => updateGame(updatedGameData));
  }, []);

  const { players, opSign, turn } = gameData;

  if (isLoading) {
    return (
      <div className="preloader-wrapper active">
        <div className="spinner-layer spinner-red-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Fragment>
        <div className={"row"} style={{ height: "10vh" }}></div>
        <div className={chat ? "col s9" : "col s12"}>
     
          <div className={"row"}>
              <Player
            socket={socket}
            turn={turn}
            pSign={pSign}
            gameId={params.game_id}
            player={players["-1"]}
          />
          </div>
          <div className={"row"}>
            <Board
              gameId={params.game_id}
              pSign={pSign}
              socket={socket}
              gameData={gameData}
              switchDice={switchDice}
            />
          </div>
          <div className={"row"}>
            {/* <div className={"col s3"}>        <Player
              socket={socket}
              turn={turn}
              pSign={pSign * -1}
              gameId={params.game_id}
              player={players["1"]}
            /></div> */}
            <button className={"btn-flat deep-orange lighten-4 col s2"}>Player 1</button>
            <button className={"btn deep-orange waves-effect waves-light  lighten-2 col s2 offset-s5"}>Resign</button>
            <button
              className={"btn deep-orange waves-effect waves-light  lighten-2 col s2 offset-s1"}
              onClick={() => showChat(!chat)}
            >
              Chat
              <i class="material-icons right">
                {chat ? "keyboard_arrow_right" : "keyboard_arrow_left"}
              </i>
            </button>
            {/* <button className={"btn col s3"} onClick={click}></button> */}
          </div>
        </div>
        {chat && (
          <div className={"col s3"}>
            <Chat socket={socket} gameId={params.game_id} pSign={pSign} />{" "}
          </div>
        )}
        {/* <div className="row col s12">
          <NewGameButton
            socket={socket}
            gameId={params.game_id}
            handleNewGameClick={handleNewGameClick}
          />
        </div> */}
      </Fragment>
    );
  }
}
