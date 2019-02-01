import React, { Component } from "react";
import {hot} from "react-hot-loader";
import { isNullOrUndefined } from "util";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eligible: false,
      filled: false,
      suggestion: isNullOrUndefined,
      score: isNullOrUndefined,
    }

  }

  render () {
    return (
      <td>{this.state.suggestion}</td>
    )
  }
}

export default hot (module)(Cell);