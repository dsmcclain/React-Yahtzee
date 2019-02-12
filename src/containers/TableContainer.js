import React, { Component } from "react"
import {hot} from "react-hot-loader"
import TableSections from "./TableSections.js"
import "../styles/ScoreTable.css"

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
			upperActive: [false, false, false, false, false, false],
      upperTotal: [0,0,0,0,0,0],
      lowerActive: [false, false, false, false, false, false, false],
      lowerTotal: [0,0,0,0,0,0,0],
		}
  }

  // LOGIC FOR REAL-TIME UPDATING OF SCORES IN TABLE

  // triggered when dice change
	componentDidUpdate(prevProps) {
		if (this.props.pips !== prevProps.pips) {
      this.checkUpper(this.props.pips)
      this.checkLower(this.props.pips)
		}
	}

  // determine what scoring options are available for user and
  // calculate their values
	checkUpper(pips) {
		let newActive = [...this.state.upperActive];
		let newTotal = [...this.state.upperTotal];
		for (let i = 0; i <= 5; i++) {
			let count = pips.filter(x => x===i).length;
			pips.includes(i) ? (
				newActive[i] = true,
				newTotal[i] = count*(i+1)
			) : (  
				newActive[i] = false,
				newTotal[i] = 0 )
    }
    // call setState with updater function to protect against
    // bugs resulting from asynchronous updating
		this.setState((state) => ({ upperActive: newActive }))
		this.setState((state) => ({ upperTotal: newTotal }))
  }	
  
  checkLower(pips) {
    let newActive = [...this.state.lowerActive]
    let newTotal = [...this.state.lowerTotal]
    let diceObject = {}
    let diceSum = 0

    // Extract pips array into an object where keys represent 
    // dice faces and values represent the number of times 
    // each face is showing. Keys are sorted in ascending order.
    pips.forEach(dice => {
      diceObject[dice] = (diceObject[dice] || 0)+1
      diceSum = diceSum + dice + 1 
    })

    let pair = Object.values(diceObject).includes(2)
    let triple = Object.values(diceObject).includes(3)
    let quadruple = Object.values(diceObject).includes(4)
    let yahtzee = Object.values(diceObject).includes(5)

    let faces = Object.keys(diceObject)

    let fiveConsecutive = 
      (faces.length === 5 && faces[4] - faces[0] === 4)

    let fourConsecutive =
      ((faces.length === 5 && 
        (faces[4] - faces[1] === 3 || faces[3] - faces[0] === 3)) ||
        (faces.length === 4 && faces[3] - faces[0] === 3))
    /*
    triple && (newActive[0] = true)
    quadruple && (newActive[0] = true, newActive[1] = true)
    yahtzee && (newActive[0] = true, newActive[1] = true, newActive[5] = true)
    (triple && pair) && (newActive[2] = true )
    fourConsecutive && (newActive[3] = true)
    fiveConsecutive && (newActive[4] = true)
    */
    newActive[0] = triple || quadruple || yahtzee
    newActive[1] = quadruple || yahtzee
    newActive[2] = triple && pair
    newActive[3] = fourConsecutive
    newActive[4] = fiveConsecutive
    newActive[5] = yahtzee
    newActive[6] = (this.props.roll === 3)

    newActive[0] ? (newTotal[0] = diceSum) : (newTotal[0] = 0)
    newActive[1] ? (newTotal[0] = diceSum) : (newTotal[1] = 0)
    newActive[2] ? (newTotal[2] = 25) : (newTotal[2] = 0)
    newActive[3] ? (newTotal[3] = 30) : (newTotal[3] = 0)
    newActive[4] ? (newTotal[4] = 40) : (newTotal[4] = 0)
    newActive[5] ? (newTotal[5] = 50) : (newTotal[5] = 0)
    newActive[6] ? (newTotal[6] = diceSum) : (newTotal[6] = 0)

    this.setState((state) => ({ lowerActive: newActive }))
		this.setState((state) => ({ lowerTotal: newTotal }))
  }

  render() {
    return (
      <div className="scorecard-canvas">
        <table className="upper-scorecard">
          <th colSpan="2">Upper Section</th>
          <th>Score</th>
            <TableSections name={'upper'}
                            items={UPPER_ITEMS}
                            active={this.state.upperActive}
                            total={this.state.upperTotal}
                            pips={this.props.pips}
                            roll={this.props.roll} /> 
        </table>
        <table className="lower-scorecard">
          <th colSpan="2">Lower Section</th>
          <th>Score</th>
            <TableSections name={'lower'}
                            items={LOWER_ITEMS}
                            active={this.state.lowerActive}
                            total={this.state.lowerTotal}
                            pips={this.props.pips}
                            roll={this.props.roll} />
        </table>
      </div>
    )
  }
}

const UPPER_ITEMS = [
  {name: 'Aces', description: 'Total of all Aces'},
  {name: 'Twos', description: 'Total of all Twos'},
  {name: 'Threes', description: 'Total of all Threes'},
  {name: 'Fours', description: 'Total of all Fours'},
  {name: 'Fives', description: 'Total of all Fives'},
  {name: 'Sixes', description: 'Total of all Sixes'},
]

const LOWER_ITEMS = [
  {name: 'Three of a Kind', description: 'Total of all Dice'},
  {name: 'Four of a Kind', description: 'Total of all Dice'},
  {name: 'Full House', description: 'Score 25'},
  {name: 'Small Straight', description: 'Score 30'},
  {name: 'Large Straight', description: 'Score 40'},
  {name: 'YAHTZEE', description: 'Score 50'},
  {name: 'Chance', description: 'Total of All Dice'},
  {name: 'Bonus YAHTZEES', description: 'Score 100 each'},
]

export default hot (module)(TableContainer);