import React from 'react';

export default function Dice({ active, faceValue, handleDiceThrow }) {


  const faceHex = isNaN(faceValue)
    ? "25a2"
    : String(2680 + faceValue - 1);

  const face = "&#x" + faceHex + ";";

  const getDiceStyle = () => {

    return ({
      fontSize: active ? "6em" : "5em",
      color: "black",
      height: "20%",
    })

  };

  return (
    <span
      onClick={handleDiceThrow}
      className="diceFace"
      style={getDiceStyle()}
      dangerouslySetInnerHTML={{ __html: `${face}` }}
    ></span>
  );
}

