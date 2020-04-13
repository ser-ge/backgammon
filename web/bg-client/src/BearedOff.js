import React, { Component } from 'react';

class BearedOff extends Component {
    
    getCheckerStyle = (numChecker, pSign) => (
        {gridRowStart : pSign === 1 ? 15 - numChecker : "" ,
        backgroundColor: pSign === -1 ? "black" : "ivory"}

    )
    render() {
   
        return ( 
         <div className="beared-off">
      
             <div className="beared-off-section top">
          
            {this.props.bearedOff["-1"].map( (checkerNum) => (
                <div className="beared-checker" style={this.getCheckerStyle(checkerNum, -1)}></div> 
            )

            )}
            </div>

            <div className="beared-off-section bottom">


                     {this.props.bearedOff["1"].map( (checkerNum) => (
                <div className="beared-checker" style={this.getCheckerStyle(checkerNum, 1)} ></div> 
            )

            )} 
            
            
            </div>
      
       </div> 
         );
    }
}
 
export default BearedOff;