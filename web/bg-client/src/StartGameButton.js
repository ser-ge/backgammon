import React, { Fragment } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import Game from "./Game";

export default class StartGameButton extends React.Component {
  handleNewGameClick = () => {
    // this.props.socket.emit("create");
    // this.props.socket.on("join_room", this.getData);
  };
  render() {
    return (
      <Fragment>
        <Link
          className={buttonCSS}
          to={`/game/${this.props.id}`}
          style={buttonStyle}
          onClick={this.handleNewGameClick}
        >
          Start Game
        </Link>
        <Route
          path="/game/:game_id"
          render={(props) => <Game {...props} socket={this.props.socket} />}
        />{" "}
      </Fragment>
    );
  }
}

var buttonCSS =
  "waves-effect waves-light btn-small deep-orange darken-4 left-align";

var buttonStyle = {
  fontSize: "1vw",
};

{
  /* <i class={"material-icons small left left hide-on-small-only"}> */
}
