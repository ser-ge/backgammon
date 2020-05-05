import React from 'react';


export default class Bar  extends React.Component {

   

    drawCheckers(value) {

        const height = 100
        const width = 100
        const r = 30
      

        function offset(count) {
            return (
                (count+0.5)*r*2 +2
            )
        }

        const checkers = Array.from(Array(Math.abs(value)).keys());
        // console.log(checkers);
        return (checkers.map((e) => {
            return (

            <circle 
            cx={width/2+"%"} 
            cy={height - offset(e) + "%"} 
            r={r + "%"} 
            stroke="grey" 
            stroke-width="2" 
            fill={value > 0 ? 'ivory' : 'black'}/>
                
            )

        })

        )};  
  
    getSvgPointStyle = (id) => {
        return {
        className : "svg-triangle",
        
        width :  "100%",
        height : "100%",
        transform : (id > 12 ? "scale(1,1)" : 'scale(1,-1)') , 
        fill : id % 2 == 0 ? 'ivory' : 'black',
        // display : "block",
        // position : "absolute",
        bottom : "0%",
        left : "25%",
        zIndex : "2"
        


        }
    }

    getSvgCheckersStyle = (id) => {
      return {
        position:"absolute",
        transform : (id > 12 ? "scale(1,1)" : 'scale(1,-1)'),
        width :  "100%",
        height : "100%",
        top : "0%",
        left : "0%",
        zIndex : "10"

      }
    }

    getPointStyle = (id) => {
      return {
        className : "point",
        gridRow : id < 13 ? "1" : "3",
        // display : "grid",
        alignItems: "centre",
        margin: "none",
        border: "none",
        backgroundColor: "inherit",
        height: "100%",
        width: "100%",
        position: "relative"
      }

    }


    render() {

    const {value, id} = this.props.point;
    const height = 300
    const width = 50
    const r = 30

   
    return (

      <button 
      onClick={this.props.onClick.bind(this,id)}
      width={"100%"}
      style={this.getPointStyle(id)}
      >
        <svg xmlns={"http://www.w3.org/2000/svg"} viewBox={"0 0 100 100"} preserveAspectRatio={"none"} style={this.getSvgPointStyle(id)} >
        <polygon points="50,0 90,100 10,100" />
        </svg> 
        <svg xmlns={"http://www.w3.org/2000/svg"} viewBox={"0 0 100 100"} preserveAspectRatio="xMaxYMax" style={this.getSvgCheckersStyle(id)}>
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