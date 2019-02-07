import React, { Component } from "react";
import {hot} from "react-hot-loader";
import { isNullOrUndefined } from "util";
import "../styles/Cell.css";


// This presentational component is rendered by ScoreTable.js
class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filled: false,
      score: 0,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    {(!this.state.filled && this.props.eligible) && this.setState ({
      score: (this.props.suggestion),
      filled: true
    })}
  }

  render () {
    let cell;

    if (this.state.filled) {
      cell = this.state.score
    } else if (this.props.eligible) {
      cell = this.props.suggestion
    } else {
      cell = isNullOrUndefined
    }
    return (
      <td className={`cell ${this.state.filled ? "filled" : 
            (this.props.eligible ? "eligible" : "empty")}`} 
          onClick={this.handleClick}>{cell}</td>
    )
  }
}

export default hot (module)(Cell);