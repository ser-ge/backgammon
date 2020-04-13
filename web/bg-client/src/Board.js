import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
import './index.css';
import Points from './Points'
import BearedOff from './BearedOff'
import Square from './Point'
import NewGameButton from './NewGameButton'
import GameIDForm from './GameIDForm'
import TwoDice from './TwoDice';


let endPoint = 'http://localhost:5000'

var socket = socketIOClient(endPoint);


export default class Board extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          points : [],
          pSign: 1,
          dice: [6,6],
          game_id: '',
          move: [],
          moves:[],
          activeDice : 0,
          bearedOff: {'1':[], '-1':[],}
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

    console.log('mount_run')
    socket.on('game_data', this.getData);
    
}


  handlePointClick = (id) => {
      const points = this.state.points.slice();
      socket.emit('move',
      {player_sign:this.state.pSign,
        start: id,
        roll: this.state.dice[0],
        room:this.state.game_id
    }) ;
    
  }

  handleDiceThrow = () => {
    console.log('rolling')
    socket.emit('roll_dice', {player_sign : this.state.pSign,
                              room : this.state.game_id,}
                              )
  }




  render() {
    const status = 'Next player: X';
    return (
      <div>
        <div className="board">
        <div className="game-back-board">
        <div className="centre-board">
    

        <Points row={"points-top"}  points={this.state.points.slice(1,13).reverse()} handlePointClick={this.handlePointClick} orient={'down'}/>



        <TwoDice dice={this.state.dice} handleDiceThrow={this.handleDiceThrow}/>


        <Points row={"points-bottom"} points={this.state.points.slice(13,25)} handlePointClick={this.handlePointClick} orient={'up'}/>

        <div className="bar centre"><div className="bar-gap"></div>sdf</div>


      </div>

    </div>

    <BearedOff bearedOff={this.state.bearedOff} />
    </div>
       <div className="board-row">    
       <GameIDForm value={this.state.game_id} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
       <NewGameButton handleNewGameClick={this.handleNewGameClick}/>
     </div>
     </div>
      );
  }
}
