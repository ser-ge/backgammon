import React, { useEffect, useState, Fragment } from "react";
import NewGameButton from "./NewGameButton";
// import StartGameModal from './StartGameModal'
import StartGameButton from "./StartGameButton";

export default function LandingPage({ socket, id }) {
  const [gameId, setGameId] = useState("");

//   useEffect(() => {
//     setGameId(id);
//   }, [id]);

  return (
    <Fragment>
      <NewGameButton socket={socket} gameId={id} />
     
    </Fragment>
  );
}
