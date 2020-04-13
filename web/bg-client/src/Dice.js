import React from 'react';


export default class Dice extends React.Component {



    render() {
      // if(this.props.faceValue === null) return (<div></div>);

      const face = "&#x" + String(2680 + this.props.faceValue -1) + ";"

      return (
        <span>
          <span onClick={this.props.handleDiceThrow} id="diceFace" dangerouslySetInnerHTML={{ __html: `${face}` }}></span>           
        </span>
      );
    }
  }