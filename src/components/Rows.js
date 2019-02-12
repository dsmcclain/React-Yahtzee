import React, { Component } from "react"
import {hot} from "react-hot-loader"
import Cell from "../components/Cell.js"

const Rows = (props) => {
  const rows = []
    props.items.forEach((item, index) => {
      rows.push(
      <tr>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <Cell id={index}
              active={props.active[index]} 
              potential={props.potential[index]}
              filled={props.filled[index]}
              score={props.score[index]} 
              toggleCell={props.toggleCell}/>
      </tr>
      )
    })

  return (rows)
}

export default hot (module) (Rows)