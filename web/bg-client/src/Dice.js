import React from 'react';


export default class Dice extends React.Component {



    render() {
     const {faceValue} = this.props

     const faceHex = isNaN(faceValue) ? "25a2" : String(2680 + this.props.faceValue -1)


      const face = "&#x" + faceHex + ";"

      return (

          <span onClick={this.props.handleDiceThrow} className="diceFace" dangerouslySetInnerHTML={{ __html: `${face}` }}></span>           

      );
    }
  }