import React from 'react';


export default class Dice extends React.Component {

  shouldComponentUpdate(nextProps){
    console.log(isNaN(nextProps.faceValue) == false)
    
    return isNaN(nextProps.faceValue) == false ;
  }

    render() {
      // if(this.props.faceValue === null) return (<div></div>);

      const face = "&#x" + String(2680 + this.props.faceValue -1) + ";"

      return (
        <div>
          <div onClick={this.props.handleDiceThrow} id="diceFace" dangerouslySetInnerHTML={{ __html: `${face}` }}></div>           
        </div>
      );
    }
  }