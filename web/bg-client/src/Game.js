import Board from './Board'
import React, { Component } from 'react';
import NewGameButton from './NewGameButton'
import GameIDForm from './GameIDForm'
import Player from './Player'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pSign: 1,
          }
    }


    handleChange = (event) => {
        event.preventDefault()
        this.setState({game_id: event.target.value});
       
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.socket.emit('join', this.state.game_id)
        // socket.on('join_room', this.getData)
        this.setState({pSign: -1})
    
    }

    getData = gameData => {
        console.log(gameData)
          this.setState({...gameData})
      }

    componentDidMount(){

        console.log('mount_run')
        this.props.socket.on('game_data', this.getData);
        
    }



    render() {
        const {socket} = this.props
        return ( 

            <div className="game" style={gamePageStyle}>

            <Board pSign={this.state.pSign} socket={socket}/>
            <Player/>
            <div style={sideBarButtonStyle} className={"section"} >
                <div className={"row"}>
                <NewGameButton socket={socket}/>
                </div>
            <div className={"row"}>
                <GameIDForm value={this.state.game_id} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />

            </div>
            </div>

            </div>
         );
    }
}

var gamePageStyle = {
    display : "grid",
    height : "100vh",
    backgroundColor: "#096046",
    gridTemplateRows: "repeat(2,auto) repeat(3, auto) 0.2fr",
    gap : "10px",
    gridTemplateColumns: "repeat(2,0.5fr) repeat(3,1fr) repeat(2, 0.4fr) 0.2fr",
    gridTemplateAreas : ` "hd hd    hd    hd        hd    hd   hd   hd"
                          ".  .     .     op-player .     .    .    . "      
                          ".  sd    board board     board .    chat . "
                          ".  sd    board board     board .    chat . "
                          ".  sd    board board     board .    chat . "
                          ".  .     player    player    player     .    .    . "      
                        `
}

var sideBarButtonStyle = {
    gridArea : "sd",

}
 
export default Game;


