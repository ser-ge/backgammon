import React from 'react';
import Point from './Point'

export default class Points extends React.Component {
    
  
    render() {
      return this.props.points.map((point) => (
        <Point reversed={this.props.reversed} point={point} onClick={this.props.handlePointClick} row={this.props.row} orient={this.props.orient}/>

      ));
    }
}

