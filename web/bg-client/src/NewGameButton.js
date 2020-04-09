import React from 'react';

export default class NewGameButton extends React.Component {
  
    render() {
      return (
        <button onClick={this.props.handleNewGameClick}>
          New Game
        </button>
      );
    }
}