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
          positions : [],
          pSign: 1,
          dice: [0,0],
          game_id: ''
};
}
handleChange = (event) => {
    event.preventDefault()
    this.setState({game_id: event.target.value});
   
}

handleSubmit = (event) => {
    event.preventDefault()
    socket.emit('join', this.state.game_id)
    socket.on('join_room', this.getData)
    this.setState({pSign: -1})

}

handleNewGameClick = () => {
    socket.emit('create')
    socket.on('join_room', this.getData)
    
}


  getData = gameData => {
    console.log(gameData)
      this.setState({...gameData})
  }

  componentDidMount(){
    socket.on('connect', function() {
        console.log('Websocket connected!');
    });

    
    socket.on('join_room', this.getData);
    socket.on('move', this.getData)
    socket.on('roll_dice', this.getData)
}

  handleClick(id) {
      const points = this.state.positions.slice();
      socket.emit('move',
      {player_sign:this.state.pSign,
        start: id,
        roll: this.state.dice.pop(),
        room:this.state.game_id
    }) ;
    socket.on('move', this.getData)
    
  }

  handleDiceThrow(){
    console.log('rolling')
    socket.emit('roll_dice', {player_sign : this.state.pSign,
                              room : this.state.game_id,
     })

     

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
        {this.state.positions.slice(1,13).map((number,i) => this.renderSquares(number,1,i))}
        </div>
        <div className="board-row">    
         <Dice faceValue={this.state.dice[0]} onClick={()=> this.handleDiceThrow()}/>
         <div className="board-row">         <Dice faceValue={this.state.dice[1]} onClick={()=> this.handleDiceThrow()}/>
</div>
        </div>
        <div className="board-row">
        {this.state.positions.slice(13,25).map((number,i) => this.renderSquares(number,2,i))}
        </div>
        <GameIDForm value={this.state.game_id} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <NewGameButton handleNewGameClick={this.handleNewGameClick}/>
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

class Dice extends React.Component {
  
    render() {
    //   if(this.props.faceValue == null) return ;
      const face = "&#x" + String(2680 + this.props.faceValue -1) + ";"
      return (
        <div>
             
          <div onClick={this.props.onClick} id="diceFace" dangerouslySetInnerHTML={{ __html: `${face}` }}></div>           
        </div>
      );
    }
  }

class GameIDForm extends React.Component {

render() {
    return (
    <form onSubmit={this.props.handleSubmit}>
        <label>
        Name:
        <input type="text" value={this.props.value} onChange={this.props.handleChange} />
        </label>
        <input type="submit" value="Submit" />
    </form>
    );
}
}


class NewGameButton extends React.Component {
  
    render() {
      return (
        <button onClick={this.props.handleNewGameClick}>
          New Game
        </button>
      );
    }
}
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
