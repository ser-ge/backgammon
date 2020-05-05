import Board from "./Board";
import React, { useState, useEffect, Component, Fragment } from "react";
import {Redirect} from "react-router-dom"
import Chat from "./Chat";
import { config } from "./EndPoints";
import M from "materialize-css";
import TopPanel from "./TopPanel";

export default function Game({
  newGameId,
  pSignProp,
  socket,
  match: { params },
  handleNewGameClick,
}) {
  const [gameData, setGameData] = useState({});

  const [isLoading, setLoaded] = useState(true);
  const [chat, showChat] = useState(false);
  const [gameId, setGameId] = useState(newGameId);
  const [pSign, setpSign] = useState(pSignProp);
  const [canDouble, setCanDouble] = useState(true);
  const [doubleProposed, setDoubleProposed] = useState(false);
  const [proposal, setProposal] = useState({})


  const joinUrl = config.url.JOIN_GAME_URL + params.game_id;
  console.log(joinUrl);

  const joinGame = (data) => {
    console.log("Fetching Data");
    console.log(data);
    if (data.error) {
      return (<Redirect to = {config.url.HOME} />)

    }else{
    setGameData({ ...gameData, ...data });
    setpSign(data.pSign);
    setGameId(data.gameId);
    }
  };

  const switchDice = () => {
    setGameData({ ...gameData, dice: gameData.dice.reverse() });
  };

  const updateGame = (updatedGameData) => {
    setGameData({ ...gameData, ...updatedGameData });

    let  d=gameData.doubleDiceOwner == pSign * -1 ? false : true

    setCanDouble(d);

  };



  const send = (channel, data) => {
    socket.emit(channel, { ...data, player_sign: pSign, room: gameId });
    console.log("SENDING ON" + channel)
    console.log(data)
  };

  const double = () => {
    if (doubleProposed) {
      send("double", { proposal: false, accept: true });
      console.log("--unseting ACCRPT-----")
      setDoubleProposed(false);
    } else {
      send("double", { proposal: true, accept: NaN });
    }
  };

  const resign = () => {
    send("resign");
    setDoubleProposed(false);
  };

  const notifyResigned = (resigner) =>{

    let color = resigner == "1" ? "White" : "Black"
    M.toast({ html: color + " has resigned", displayLength: 7000 });

  }


  useEffect(() => {
    const { gameId } = gameData;

    if (newGameId === undefined) {
      fetch(joinUrl, { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((data) => joinGame(data))
        // .then(() => setLoaded(false));
    }

    socket.emit("join", { gameId: params.game_id });
    socket.on("game_data", (updatedGameData) => updateGame(updatedGameData));
    socket.on("double", (proposal) => setProposal(proposal));
    socket.on("resign", (resigner) => notifyResigned(resigner))
  }, []);

  useEffect(()=> {
    // if (!isLoading) {
    //   socket.emit("join", { gameId: params.game_id });
    //   socket.on("game_data", (updatedGameData) => updateGame(updatedGameData));
    //   socket.on("double", (proposal) => setProposal(proposal));
    // }

    if (typeof gameData.points != "undefined"){
      setLoaded(false)
    }

    if (gameData.winner) {
      let color = gameData.winner == "1" ? "White" : "Black"
      M.toast({ html: color + " won the game!", displayLength: 7000 });
      send("restart_game")
    }

    if (gameData.doubleDiceOwner == pSign*-1) {
      setCanDouble(false)
    }
    
 
  }, [gameData])



  useEffect(()=>{
    if (doubleProposed){
      M.toast({ html: "Oppent has proposed a <strong>double<strong>: accept or resign", displayLength: 5000 });
    }
  }, [doubleProposed])

  useEffect(()=>{
    console.log("Received Double Proposal" + proposal)
    console.log(proposal)
    console.log(pSign)
    console.log(proposal.pSign == pSign || proposal.proposal)
    if (proposal.pSign == pSign) {
      return;
    } else if (proposal.accept == true) {
      M.toast({ html: "Oppent has <strong>accepted<strong> the double", displayLength: 5000 });
      return
    } else if (proposal.pSign != pSign && proposal.proposal){
      console.log("---setting ACCEPT -----")
      setDoubleProposed(true);}

  },[proposal])


  const { gamePoints, score, players, opSign, turn } = gameData;

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
          <TopPanel
            gameId={params.game_id}
            pSign={pSign}
            socket={socket}
            turn={turn}
            score={score}
            gamePoints={gamePoints}
            players={gameData.players}
          />

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

            <button
              className={
                "btn deep-orange waves-effect waves-light  lighten-2 col s2 "
              }
              onClick={resign}
            >
              Resign
            </button>

            <button
              className={
                "btn deep-orange waves-effect waves-light  lighten-2 col s2 offset-s5 " +
                (canDouble ? "" : "disabled")
              }
              onClick={double}
            >
              {doubleProposed ? "Accept Double" : "Double"}
            </button>

            <button
              className={
                "btn deep-orange waves-effect waves-light  lighten-2 col s2 offset-s1 "
              }
              onClick={() => showChat(!chat)}
            >
              Chat
              <i class="material-icons left">
                {chat ? "keyboard_arrow_right" : "keyboard_arrow_left"}
              </i>
            </button>
            {/* <button className={"btn col s3"} onClick={click}></button> */}
          </div>
        </div>

          <div className={chat ? "col s3" : "hide"}>
            <div className={"row"}>
              <Chat
                socket={socket}
                gameId={params.game_id}
                pSign={pSign}
                chatOpen_={chat}
         
              />{" "}
            </div>
          </div>
        
      </Fragment>
    );
  }
}
