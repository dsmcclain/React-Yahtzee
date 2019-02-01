import React, { Component } from "react";
import {hot} from "react-hot-loader";
import { isNullOrUndefined } from "util";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filled: false,
      score: 5,
    }

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
      <td>{cell}</td>
    )
  }
}

export default hot (module)(Cell);