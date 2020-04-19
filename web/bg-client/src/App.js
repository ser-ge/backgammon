import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./Game";
import NewGameButton from "./NewGameButton";

import socketIOClient from "socket.io-client";

let endPoint = "http://localhost:5000";

var socket = socketIOClient(endPoint);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="row">
          <nav>
            <div class="nav-wrapper light-green darken-3">
              <ul id="nav-mobile" class="left hide-on-med-and-down">
                <li>
                  <NewGameButton socket={socket} />
                </li>
                <li>
                  <a href="badges.html">Components</a>
                </li>
                <li>
                  <a href="collapsible.html">JavaScript</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="row">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <NewGameButton {...props} socket={socket} fullPage={true} />
              )}
            />
            <Route
              path="/game"
              render={(props) => <Game {...props} socket={socket} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
