import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./Game";
import NewGameButton from "./NewGameButton";
import StartGameButton from "./StartGameButton";
import LandingPage from './LandingPage'
import io from "socket.io-client";
import {config} from "./EndPoints"





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket : io(config.url.SOCKET_URL),
    };
  }

  getData = (gameData) => {
    console.log(gameData);
    this.setState({ ...gameData });
  };

  componentDidMount() {
    console.log("mount_run");
    this.state.socket.on("join", this.getData);}

  handleNewGameClick = () => {
      // socket.emit("create");
  
      fetch(config.url.NEW_GAME_URL, {method: 'GET', credentials: 'include' })
        .then((response) => response.json())
        .then((data) => this.getData(data));
    };

  render() {
    const {socket} = this.state
    return (
      <Router>

        <div className="row">
          
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <LandingPage {...props} socket={socket} id={this.state.gameId} handleNewGameClick={this.handleNewGameClick}/>
              )}
            />
            <Route
              path="/game/:game_id"
              render={(props) => <Game {...props} socket={socket} newGameId={this.state.gameId} pSignProp={this.state.pSign} handleNewGameClick={this.handleNewGameClick}/>}
            />
          </Switch>
 
        </div>
      </Router>
    );
  }
}

export default App;
