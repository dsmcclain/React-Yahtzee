import React, { Component } from "react";
import {hot} from "react-hot-loader";
import { isNullOrUndefined } from "util";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eligible: true,
      filled: false,
      suggestion: 10,
      score: 5,
    }

  }

  render () {
    let cell;

    if (this.state.filled) {
      cell = this.state.score
    } else if (this.state.eligible) {
      cell = this.state.suggestion
    } else {
      cell = isNullOrUndefined
    }
    return (
      <td>{cell}</td>
    )
  }
}

export default hot (module)(Cell);