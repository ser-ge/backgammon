import React from 'react';

export default class Point  extends React.Component {

   

    drawCheckers(value) {

        const height = 300
        const width = 50
        const r = 20

        function offset(count) {
            return (
                (count+0.5)*r*2
            )
        }

        const checkers = Array.from(Array(Math.abs(value)).keys());
        // console.log(checkers);
        return (checkers.map((e) => {
            return (
            <circle 
            cx={width/2} 
            cy={height - offset(e)} 
            r={r} 
            stroke="grey" 
            stroke-width="5" 
            fill={value > 0 ? 'white' : 'black'}/>
                
            )

        })

        )};  
  
    getPointStyle = (id) => {
        return {
        className : "svg-triangle",
        version : "1.1",
        width :  50,
        height : 300,
        r : 20,
        transform : (id > 12 ? "scale(1,1)" : 'scale(1,-1)') , 
        fill : id % 2 == 0 ? 'white' : 'black'  
        }
    }  
    render() {

    const {value, id} = this.props.point;
    const height = 300
    const width = 50
    const r = 20

   
    return (

      <button 
      className="triangle" 
      onClick={this.props.onClick.bind(this,id)}
      width={50}
      >
        <svg  style={this.getPointStyle(id)} >
        <polygon points="25,0 50,300 0,300" />
        {this.drawCheckers(value)}
        </svg> 
      </button>

    );
  }
}


// renderSquares(number,half,i) {

//     const orient = half == 1 ? "scale(1,-1)" : "scale(1,1)"
//     const id = i + 1 - (1-half)*12 // Hacky redo!!!
//     console.log(id)
//     return ( <Square
//         id={id} 
//         onClick={() => this.handleClick(id)} 
//         orient={orient}
//         color={number < 0 ? 'black' : 'white'} 
//         />
//         );
//   }