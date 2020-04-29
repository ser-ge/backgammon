import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./Game";
import NewGameButton from "./NewGameButton";
import StartGameButton from "./StartGameButton";
import LandingPage from './LandingPage'
import socketIOClient from "socket.io-client";

let endPoint = "http://localhost:5000";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket : socketIOClient(endPoint),
    };
  }

  getData = (gameData) => {
    console.log(gameData);
    this.setState({ ...gameData });
  };

  componentDidMount() {
    console.log("mount_run");
    this.state.socket.on("join", this.getData);}



  render() {
    const {socket} = this.state
    return (
      <Router>
        {/* <div className="row">
          <nav>
            <div className="nav-wrapper light-green darken-3">
              <ul id="nav" class="left">
                <li>
                  <NewGameButton socket={socket} />
                </li>
                <li>
                  <StartGameButton socket={socket} id={this.state.gameId} />
                </li>
              </ul>
            </div>
          </nav>
        </div> */}

        <div className="row">
          
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <LandingPage {...props} socket={socket} id={this.state.gameId} />
              )}
            />
            <Route
              path="/game/:game_id"
              render={(props) => <Game {...props} socket={socket} gameId={this.state.gameId} pSign={this.state.pSign}/>}
            />
          </Switch>
 
        </div>
      </Router>
    );
  }
}

export default App;
