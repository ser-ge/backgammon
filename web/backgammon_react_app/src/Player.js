import React, { Component, Fragment } from "react";

// class Player extends Component {
//   // state = { name: "Player 1", connected: false };

//   getPlayerCardStyle = (player) => {
//     return {
//       gridArea: "player",
//     };
//   };

//   // getData = (gameData) => {
//   //   console.log(gameData);
//   //   this.setState({ ...gameData[this.props.pSign] });
//   // };

//   // componentDidMount() {
//   //   const { socket, pSign, gameId } = this.props;
//   //   console.log("player mount --------- player data request sent");
//   //   // socket.emit("player_data", gameId);
//   //   socket.on("player_data", this.getData);
//   // }

//   render() {
//     console.log(this.props)
//     const { connected, name } = this.props.player;
//     let { turn, pSign } = this.props;
//     let isTurn = turn == pSign ? true : false;

//     const connectedStyle = connected
//       ? "col s4 offset-col-s4 orange-text text-lighten-2 "
//       : " col s4 s4 offset-col-s4 grey-text text-lighten-1 ";

//     return (
//       // <div className="card amber lighten-5">
//       //   <div className="card-stacked">
//       //     <div className="card-content">
//       //       <span >
//       //         {" "}
//       //         {name}
//       //       </span>
//       //     </div>
//       //     <div className="card-action">
//       //       <span className={connectedStyle}>
//       //         {connected ? <span className={isTurn ? "light-green-text text-darken-1" : "grey-text"}>turn</span> : "waiting for player"}{" "}
//       //       </span>

//       //     </div>
//       //     {!connected && <div className="progress"><div className="indeterminate"></div></div>}
//       //   </div>
//       // </div>
//       <Fragment>
//       <div className={" amber lighten-5 row"} style={styleContainer}>
//         <div className={"col s3"}>
//           {name}
          
//         </div>
//         <div className={connectedStyle}>
//             {connected ? (
//               <span
//                 className={
//                   isTurn ? "light-green-text text-darken-1" : "grey-text"
//                 }
//               >
//                  turn
//               </span>
//             ) : (
//               "waiting for player"
//             )}{" "}
//           </div>
//       </div>
//     <div className={"row"}>  {!connected && <div className="progress"><div className="indeterminate"></div></div>} </div>
//     </Fragment>
//     );
//   }
// }


// var styleContainer = {
//   padding: "0.75rem 0.75rem",
//   marginBottom: "0",
// }


function Player ({pSign, player, turn}) {

  const {connected, name} = {connected: true, name:"Player 2"}

  const getPlayerStyle = () => {
    return  "btn-flat deep-orange lighten-4 col"
  }

  const preloader =   
  <div classNmae="progress" >
      <div class="indeterminate"></div>
  </div>

  return (
    <Fragment>
      <div className={"col s3"}>
      <div className={getPlayerStyle()}> {connected ? name : "connecting.. " }</div>
      {!connected && preloader}
      </div>
    </Fragment>
  )
}



export default Player;


