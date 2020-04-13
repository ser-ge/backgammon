import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Board from './Board'
import Home from './Home'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() {
        return (
        <Router>
            <div>
              <h2>Welcome to React Router Tutorial</h2>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Home </Link></li>
                <li><Link to={'/game'} className="nav-link">Board</Link></li>
              </ul>
              </nav>
              <hr />
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/game' component={Board} />
              </Switch>
            </div>
          </Router>
        );
      }
}
 
export default App;