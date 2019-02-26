import React from "react"
import {hot} from "react-hot-loader"
import "../styles/DiceContainer.css"

const GameOver = (props) => {
  return (
    <div className={`game${props.gameOver ? '-over' : ''}`}>
      GAME OVER!
      <br/>
      Well done.
    </div>
  )
}

export default hot (module) (GameOver)