import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Cell from "./Cell.js";

class LowerTableGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: [false, false, false, false, false, false],
      total: [0,0,25,30,40,50],
      filled: [false, false, false, false, false, false],
      score: [0,0,0,0,0,0],
    }
    this.toggleCell = this.toggleCell.bind(this);
  }

  toggleCell(id) {
    let fills = this.state.filled;
    let scores = this.state.score;
    {(!this.state.filled[id] && this.state.active[id]) && 
      ( fills[id] = true, 
        scores[id] = this.state.total[id])}
    this.setState ({
      filled: fills,
      score: scores
    })
  }

  // triggered when dice change
  componentDidUpdate(prevProps) {
    if (this.props.pips !== prevProps.pips) {
      this.checkDice(this.props.pips);
    }
  }

  checkDice(pips) {
    let newActive = [...this.state.active]
    let newTotal = [...this.state.total]
    let diceObject = {}
    let diceSum = 0

    // Extract pips array into an object where keys represent 
    // dice faces and values represent the number of times 
    // each face is showing. Keys are sorted in ascending order.
    pips.forEach(dice => {
      diceObject[dice] = (diceObject[dice] || 0)+1
      diceSum = diceSum + dice + 1 
    })

    let pairs = Object.values(diceObject).includes(2);
    let triples = Object.values(diceObject).includes(3);
    let quadruples = Object.values(diceObject).includes(4);
    let yahtzee = Object.values(diceObject).includes(5);

    let faces = Object.keys(diceObject);

    let fiveConsecutive = 
      (faces.length === 5 && faces[4] - faces[0] === 4);

    let fourConsecutive =
      ((faces.length === 5 && 
        (faces[4] - faces[1] === 3 || faces[3] - faces[0] === 3))
      || (faces.length === 4 && faces[3] - faces[0] ===3))

    newActive[0] = triples || quadruples || yahtzee
    newActive[1] = quadruples || yahtzee
    newActive[2] = triples && pairs
    newActive[3] = fourConsecutive
    newActive[4] = fiveConsecutive
    newActive[5] = yahtzee

    newActive[0] && (newTotal[0] = diceSum)
    newActive[1] && (newTotal[1] = diceSum)

    // triples && (newActive[0] = true, newTotal[0] = diceSum)
    // quadruples && (newActive[1] = true, newTotal[1] = diceSum)
    // (triples && pairs) && (newActive[2] = true)
    // fourConsecutive && (newActive[3] = true)
    // fiveConsecutive && (newActive[4] = true)
    // yahtzee && (newActive[5] = true)

    this.setState((state) => ({ active: newActive }))
		this.setState((state) => ({ total: newTotal }))
  }

  render() {
    const lowerRows = [];
    this.props.items.forEach((item, index) => {
      lowerRows.push(
      <tr>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <Cell id={index}
              active={this.state.active[index]}
              suggestion={this.state.total[index]}
              filled={this.state.filled[index]}
              score={this.state.score[index]}
              toggleCell={this.toggleCell} />
      </tr>
      )
    })

    return (
      lowerRows
    )
  }
}
  
export default hot (module)(LowerTableGenerator);