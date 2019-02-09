import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Cell from "../components/Cell.js";
import UpperSums from "../components/UpperSums.js";
import LowerTableGenerator from "./LowerTableGenerator.js"
import "../styles/ScoreTable.css";

class ScoreTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filled: [false, false, false, false, false, false],
      score: [0,0,0,0,0,0],
    }
    this.toggleCell = this.toggleCell.bind(this);
  }

  toggleCell(id) {
    let fills = this.state.filled;
    let scores = this.state.score;
    {(!this.state.filled[id] && this.props.active[id]) && 
      ( fills[id] = true, 
        scores[id] = this.props.total[id])}
    this.setState ({
      filled: fills,
      score: scores
    })
  }

  render() {
    return(
      <div className="scorecard-canvas">
        <table className="upper-scorecard">
          <th colSpan="2">Upper Section</th>
          <th>Score</th>
            <UpperTableGenerator items={this.props.upperItems}
                         active={this.props.active}
                         total={this.props.total}
                         filled={this.state.filled}
                         score={this.state.score}
                         toggleCell={this.toggleCell} />
            <UpperSums score={this.state.score}
                      filled={this.state.filled} />
        </table>
        <table className="lower-scorecard">
          <th colSpan="2">Lower Section</th>
          <th>Score</th>
          <LowerTableGenerator items={this.props.lowerItems}
                               pips={this.props.pips} 
                               roll={this.props.roll}/>
        </table>
      </div>
    );
  }
}

const UpperTableGenerator = (props) =>  {
  const rows = [];
  props.items.forEach((item, index) => {
    rows.push(
    <tr>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <Cell id={index}
            active={props.active[index]} 
            suggestion={props.total[index]}
            filled={props.filled[index]}
            score={props.score[index]} 
            toggleCell={props.toggleCell}/>
    </tr>
    )
  })

  return (
    rows
  )
}

export default hot (module)(ScoreTable)