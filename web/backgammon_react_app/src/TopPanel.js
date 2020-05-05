import React, { useSate, useEffect, Fragment } from "react";

export default function TopPanel({
  score,
  gamePoints,
  socekt,
  players,
  turn,
  pSign,
}) {

    const {connected} = players[pSign*-1]

  return (
    <Fragment>
      <div
        className="row z-depth-2 "
        style={{ backgroundColor: "rgba(0,0,0,0.2" }}
      >
        <span className={"btn-flat truncate white-text col s5"} style={{fontSize:"0.8rem"}}>
          <i class={"material-icons left " + (turn == pSign && "green-text text-accent-2")}>face</i>
          {players[pSign].name}
        </span>
        <span className={"btn-flat white-text col s2 "}>
          {score[pSign]} - {score[pSign * -1]}
        </span>
        <span className={"btn-flat truncate white-text col s5 right-align"} style={{fontSize:"0.8rem"}}>
          <i className={"material-icons right " + (turn != pSign && "green-text text-accent-2")}>face</i>
        {connected ? players[pSign*-1].name : "connecting..."}
        </span>
        {!connected && <div class="progress" style={{margin:"0"}}>
          <div class="indeterminate"></div>
        </div>}

      </div>
    </Fragment>
  );
}
