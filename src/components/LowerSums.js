import React from "react";
import {hot} from "react-hot-loader";
import "../styles/Cell.css";

const LowerSums = (props) => {
  function getSum(total, num) {
    return total + num;
  }

  let lowerSum = props.score.reduce(getSum)
  let upperSum = props.upperScores.reduce(getSum)
  let upperComplete = !props.upperFills.includes(false)
  let lowerComplete = !props.filled.includes(false) 
  return (
    <>
      <tr>
        <td>Upper Total</td>
        <td> ⇒ </td>
        <td className={upperComplete ? " filled" : " empty" }>
          {upperSum}
        </td>
      </tr>
      <tr>
        <td>Lower Total</td>
        <td> ⇒ </td>
        <td className={lowerComplete ? " filled" : " empty"}>
          {lowerSum} 
        </td>
      </tr>
      <tr>
        <td>Grand Total</td>
        <td> ⇒ </td>
        <td className={(upperComplete && lowerComplete) ? " filled" : " empty"}>
          {upperSum + lowerSum}</td>
      </tr>
    </>
  )
}

export default hot (module)(LowerSums);