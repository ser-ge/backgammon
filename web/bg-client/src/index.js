import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
import './index.css';

let endPoint = 'http://localhost:5000'

var socket = socketIOClient(endPoint);

class Square extends React.Component {

    drawCheckers() {

        const height = 300
        const width = 50
        const r = 20

        function offset(count) {
            return (
                (count+0.5)*r*2
            )
        }

        const checkers = Array.from(Array(Math.abs(this.props.numCheckers)).keys());
        console.log(checkers);
        return (checkers.map((e) => {
            return (
            <circle 
            cx={width/2} 
            cy={height - offset(e)} 
            r={r} 
            stroke="grey" 
            stroke-width="5" 
            fill={this.props.color} />
                
            )

        })

        )};  
  

    render() {
    const height = 300
    const width = 50
    const r = 20

   
    return (
      <button 
      className="triangle" 
      onClick={() => this.props.onClick()}
      >
        <svg version="1.1" className="svg-triangle" width={width} height={height}  transform={this.props.orient} >
        <polygon points="25,0 50,300 0,300" />
        {this.drawCheckers()}
        </svg> 
      </button>
    );
  }
}






class Board extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          squares : [],
      };
  }

  getData = gameData => {

      this.setState({squares : gameData.positions})
  }

  componentDidMount(){
    socket.on('connect', function() {
        console.log('Websocket connected!');
    });

    socket.emit('create');
    console.log('mounted');
    socket.on('join_room', this.getData);
}

  handleClick(id) {
      const points = this.state.squares.slice();
      points[id] -= 1 ;
      this.setState({squares : points})
  }
  renderSquares(number,half,i) {

    const orient = half == 1 ? "scale(1,-1)" : "scale(1,1)"
    const id = i + 1 - (1-half)*12 // Hacky redo!!!
    console.log(id)
    return ( <Square
        id={id} 
        onClick={() => this.handleClick(id)} 
        orient={orient}
        numCheckers={number}
        color={number < 0 ? 'black' : 'white'} 
        />
        );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
        {this.state.squares.slice(1,13).map((number,i) => this.renderSquares(number,1,i))}
        </div>
        <div>    
            ----
        </div>
        <div className="board-row">
        {this.state.squares.slice(13,25).map((number,i) => this.renderSquares(number,2,i))}
        </div>

      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}



ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
