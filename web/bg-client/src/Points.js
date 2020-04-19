import React from 'react';
import Point from './Point'

export default class Points extends React.Component {
    
  
    render() {
      return this.props.points.map((point) => (
        <Point point={point} onClick={this.props.handlePointClick} orient={this.props.orient}/>

      ));
    }
}

