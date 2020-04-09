import React from 'react';
import Point from './Point'

export default class Points extends React.Component {
    
  
    render() {
      return this.props.points.map((point) => (
         <div className='square'>
        <Point point={point} onClick={this.props.handlePointClick}/>
        </div> 
      ));
    }
}

