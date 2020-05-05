import React, { Component } from 'react';

class BearedOff extends Component {
    
    getCheckerStyle = (numChecker, pSign, section) => (
        {gridRowStart : section === 1 ? 15 - numChecker : "" ,
        backgroundColor: pSign === -1 ? "black" : "ivory"}

    )

    render() {

        const {gamePoints} = this.props

        let top = this.props.reversed ? -1 : 1

        let bottom = top * -1 
   
        return ( 
         <div className="beared-off">
      
             <div className="beared-off-section top">
          
            {this.props.bearedOff[top].map( (checkerNum) => (
                <div className="beared-checker" style={this.getCheckerStyle(checkerNum, top, -1)}></div> 
            )

            )}
            </div>
            
            <div className="double-dice">
                <span className="value"> {gamePoints == 1 ? 64 : gamePoints}</span>
            </div>

            <div className="beared-off-section bottom">


                     {this.props.bearedOff[bottom].map( (checkerNum) => (
                <div className="beared-checker" style={this.getCheckerStyle(checkerNum, bottom, 1)} ></div> 
            )

            )} 
            
            
            </div>
      
       </div> 
         );
    }
}
 
export default BearedOff;