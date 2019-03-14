import React, { Component } from "react"
import {hot} from "react-hot-loader"
import "../styles/Cell.css"

class Cell extends Component{
  constructor(props) {
    super(props);
    this.cellClick = this.cellClick.bind(this);
  }

  cellClick() {
    this.props.toggleCell(this.props.id);
  }

  render() {
    let cell;
    this.props.filled ? (cell = this.props.score) 
    : (cell = this.props.potential)
    
    return (
      <td className={`cell ${this.props.filled ? "filled" : 
          (this.props.active ? "active" : "empty")}`} 
          onClick={this.cellClick}>{cell}</td>
    )
  }
}

export default hot (module)(Cell);