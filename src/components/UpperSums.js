import React from "react";
import {hot} from "react-hot-loader";
import "../styles/Cell.css";

const UpperSums = (props) => {

  function getSum(total, num) {
    return total + num;
  }

  let subtotal = props.score.reduce(getSum);
  let complete = props.filled.includes(false);
  let bonus = subtotal >= 63 ? 35 : 0;
  return (
    <>
      <tr>
        <td>Subtotal</td>
        <td>Total of All Scores</td>
        <td className={complete ? " gray" : " filled" }>
          {subtotal}
        </td>
      </tr>
      <tr>
        <td>Bonus</td>
        <td>(If Subtotal > 63)</td>
        <td className={complete ? " empty" : " filled"}>
          {bonus} 
        </td>
      </tr>
      <tr>
        <td>Total</td>
        <td>Subtotal + Bonus</td>
        <td className={complete? " empty" : " filled"}>
          {subtotal + bonus}</td>
      </tr>
    </>
  )
}

export default hot (module)(UpperSums);