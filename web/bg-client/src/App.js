import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Game from './Game'
import NewGameButton from './NewGameButton'
import socketIOClient from "socket.io-client";


let endPoint = 'http://localhost:5000'

var socket = socketIOClient(endPoint);


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    
    render() {
        return (
        <Router>
            <div >
                  <Route exact path='/' render={(props) => <NewGameButton {...props} socket={socket} />} />
                  <Route path='/game' render={(props) => <Game {...props} socket={socket} />} />
            </div>
          </Router>
        );
      }
}

 
export default App;