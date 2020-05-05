import React, { useEffect, useState } from 'react';
import Dice from './Dice'


export default function TwoDice({dice,  switchDice,  handleDiceThrow}) {

  const [diceState, setDice] = useState([6,6]);
  const [firstIsActive, setActiveDice] = useState(true)


  const handleClick = () => {
    if (dice.length != 0) {

      switchDice()

    } else {
      handleDiceThrow()
    }
  }

  useEffect(()=>{
  
  if (dice.length > 1) {
    setDice(dice)
  }

  if (dice.length === 1) {
    setActiveDice(!firstIsActive)
  }



  },[dice])

  
  
  return (
    <div className="dice">
         
    <Dice key={0} active={firstIsActive} faceValue={diceState[0]} handleDiceThrow={handleClick} />
    <Dice key={1} active={!firstIsActive} faceValue={diceState[1]} handleDiceThrow={handleClick} /> 
    </div>
  );

}