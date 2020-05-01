import React, { Fragment, useEffect, useState, useRef } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import StartGameButton from "./StartGameButton";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

export default function NewGameButton({ socket, gameId , handleNewGameClick}) {
  const [name, setName] = useState("Player 1");

  const linkRef = useRef(null);

  const copyToClipboard = (e) => {
    linkRef.current.select();
    e.preventDefault();
    document.execCommand("copy");

    M.toast({ html: "Link Copied", displayLength: 500 });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };



  const handleStartGameClick = () => {
    const data = { username: "example" };

    // socket.emit("register_player", { room: gameId, name: name });
    // console.log("registered player " + name);
  };

  useEffect(() => {
    let elem = document.querySelectorAll(".modal");

    const options = { dismissable: false, opacity: 0 };

    M.Modal.init(elem, options);
  }, []);

  return (
    <Fragment>
      <a
        className={buttonCSS}
        style={buttonStyle}
        onClick={() => handleNewGameClick()}
        href="#modal1"
      >
        New Game
      </a>

      <div id="modal1" className="modal">
        <div className="modal-content">
          <div className="input-field col s12">
            <input
              placeholder="Player 1"
              id="name"
              type="text"
              class="validate"
              value={name}
              onChange={handleNameChange}
            />
            <label for="name">Enter Name:</label>
          </div>

          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s8">
                  <i className="material-icons prefix">link</i>
                  <textarea
                    id="game-link"
                    className="materialize-textarea"
                    ref={linkRef}
                    value={window.location.hostname + ":3000/game/" + gameId}
                  />
                  <label for="game-link">Share this link with opponent:</label>
                </div>
                <div className="input-field col s4">
                  <button
                    onClick={copyToClipboard}
                    className="waves-effect waves-light btn-small  "
                  >
                    Copy Link
                  </button>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="modal-footer">
          <StartGameButton
            handleStartGameClick={handleStartGameClick}
            socket={socket}
            id={gameId}
          />
        </div>
      </div>
    </Fragment>
  );
}

var buttonCSS =
  "waves-effect waves-light btn-small deep-orange darken-4 left-align modal-trigger";

var buttonStyle = {
  fontSize: "1vw",
};
