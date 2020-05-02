import React from 'react';


export default class Point  extends React.Component {

   

    drawCheckers(value,id) {

        const height = 100
        const width = 100
        const r = id == 0 || id == 25 ? "9.5vw" : 30
      

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
            cx= {width/2+"%"} 
            cy={height - offset(e) + "%"} 
            r={r} 
            stroke="grey" 
            stroke-width= {id == 0 || id == 25 ? 10 : 2} 
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
        zIndex : "3"
        


        }
    }

    getSvgCheckersStyle = (id) => {
      if (id == 0 || id == 25) {
        return(
          {
        position:"absolute",
        // transform : 'scale(1,-1)',
        width :  "100%",
        height : "50%",
        top : "0%",
        left : "0%",
        overflow: "visible",
        zIndex : "10"} )
          }else{
            return ( {
              position:"absolute",
              transform : (id > 12 ? "scale(1,1)" : 'scale(1,-1)'),
              width :  "100%",
              height : "200%",
              top : (id > 12 ? "-100%" : '0%'),
              left : "0%",
              zIndex : "10"})
          }

      }
    



    getPointStyle = (id) => {
      if (id == 0 || id == 25) {
        return {

          className : "point",
          // display : "grid",
          alignItems: "space-around",
          margin: "none",
          border: "none",
          backgroundColor: "inherit",
          height: "100%",
          width: "100%",
          position: "relative",
          alignSelf: "centre"
        }
      } else {
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

    };


    render() {

    const {value, id} = this.props.point;
    const height = 300
    const width = 50
    const r = 20

   
    return (

      <button 
      onClick={this.props.onClick.bind(this,id)}
      width={"100%"}
      style={this.getPointStyle(id)}
      >
       {this.props.row != 'bar' && <svg xmlns={"http://www.w3.org/2000/svg"} viewBox={"0 0 100 100"} preserveAspectRatio={"none"} style={this.getSvgPointStyle(id)} >
        <polygon points="50,0 90,100 10,100" />
    </svg> }
        <svg xmlns={"http://www.w3.org/2000/svg"} viewBox={"0 0 100 100"} preserveAspectRatio="xMaxYMax" style={this.getSvgCheckersStyle(id)}>
        {this.drawCheckers(value,id)}
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