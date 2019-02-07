import React, { Component } from "react";
import {hot} from "react-hot-loader";
import { isNullOrUndefined } from "util";
import "../styles/Cell.css";

//This presentational component is rendered by ScoreTable.js

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
    if (this.props.filled) {
      cell = this.props.score
    } else if (this.props.active) {
      cell = this.props.suggestion
    } else {
      cell = isNullOrUndefined
    }

    return (
      <td className={`cell ${this.props.filled ? "filled" : 
            (this.props.active ? "active" : "empty")}`} 
          onClick={this.cellClick}>{cell}</td>
    )
  }
}

export default hot (module)(Cell);