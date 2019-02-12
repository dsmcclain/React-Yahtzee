import React, { Component } from "react"
import {hot} from "react-hot-loader"
import UpperSums from "../components/UpperSums.js"
import LowerSums from "../components/LowerSums.js"
import Rows from "../components/Rows.js"

class TableSections extends Component {
  constructor(props) {
    super(props);
    this.state = {
    filled: [false, false, false, false, false, false, false],
    score: [0,0,0,0,0,0,0],
  }
  this.toggleCell = this.toggleCell.bind(this);
}

toggleCell(id) {
  let fills = this.state.filled;
  let scores = this.state.score;
  !this.state.filled[id] && 
    (fills[id] = true, 
      scores[id] = this.props.total[id])
  this.setState ({
    filled: fills,
    score: scores
  })
  //call to props function turnHandler via diceContainer
}

  render() {
    let sums
    this.props.name === 'upper' ? 
      sums = <UpperSums score={this.state.score} filled={this.state.filled}/>
    : sums = <LowerSums score={this.state.score} filled={this.state.filled}/>

    return (
      <>
        <Rows items={this.props.items} 
              active={this.props.active}
              total={this.props.total}
              filled={this.state.filled}
              score={this.state.score}
              toggleCell={this.toggleCell}
              />
        {sums}
      </>
    )
  }
}

export default hot (module) (TableSections)