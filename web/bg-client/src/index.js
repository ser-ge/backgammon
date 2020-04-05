import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

  render() {
    return (
      <button 
      className="triangle" 
      onClick={() => this.props.onClick()}
      >
        
        <svg version="1.1" className="svg-triangle" width='50' height='300' transform={this.props.orient}>
        <polygon points="25,0 50,300 0,300" />
        </svg>


      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          squares : Array.from(Array(24).keys()),
      };
  }

 

  handleClick(i) {
      const squares = this.state.squares.slice();
      squares[i] = '';
      this.setState({squares : squares})
  }
  renderSquares(i) {

    const orient = i <12 ? "scale(1,-1)" : "scale(1,1)"
    console.log(i)

    return ( <Square 
        value={i}
        onClick={() => this.handleClick(i)} 
        orient={orient}
        />
        );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
        {this.state.squares.slice(0,12).map((number) => this.renderSquares(number))}
        </div>
        <div>    
            ----
        </div>
        <div className="board-row">
        {this.state.squares.slice(12,24).map((number) => this.renderSquares(number))}
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
