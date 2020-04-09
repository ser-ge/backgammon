import React from 'react';
import Dice from './Dice'

export default class TwoDice extends React.Component {

  shouldComponentUpdate(nextProps){

    
    return isNaN(nextProps.dice[1]) == false ;
  }

    render() {
        
      return (
        <div>
             
        <Dice key={0} faceValue={this.props.dice[0]} handleDiceThrow={this.props.handleDiceThrow} />
        <Dice key={1} faceValue={this.props.dice[1]} handleDiceThrow={this.props.handleDiceThrow} /> 
        </div>
      );
    }
  }