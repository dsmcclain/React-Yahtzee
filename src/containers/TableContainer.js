import React, { Component } from "react"
import {hot} from "react-hot-loader"
import Rows from "../components/Rows.js"
import UpperSums from "../components/UpperSums.js"
import LowerSums from "../components/LowerSums.js"
import Bonus from "../components/Bonus.js"
import Modal from "../components/Modal.js"
import "../styles/ScoreTable.css"

class TableContainer extends Component {
  state = INITIAL_STATE

  handleCellClick = (cell_id) => {
    if (this.cellIsClickable(cell_id)) {
      if (this.props.roll < 3 || this.state.potential[cell_id] === 0 ) {
        this.setState({ cell_id: cell_id }, () => {this.setModalMessage()})
      } else {
        this.setState({ cell_id: cell_id }, () => {this.toggleCell()})
      }
    }
  }

  cellIsClickable = (cell_id) => {
    return (this.props.roll !== 0 && !this.props.tableClicked && !this.state.filled[cell_id])
  }

  setModalMessage = () => {
    const { cell_id, potential } = this.state
    if (this.props.roll < 3 ) {
      let message = 'Are you sure you want to end your turn? You can still roll again.'
      potential[cell_id] === 0 && 
        (message += ' (This will result in a score of zero for this item.)')
      this.setState({modalMessage: message},() => {this.openModal()})
    } else if (this.otherCellsHavePotential()) {
      this.setState({modalMessage: 'Are you sure you want to put a zero here? You could score more points elsewhere.'}, 
                     () => {this.openModal()})
    } else {this.toggleCell()}
  }

  otherCellsHavePotential = () => {
    for (let i = 0; i < 15; i++) {
      if (!this.state.filled[i] && this.state.potential[i]) {
        return true
      }
    }
  }

  openModal = () => { this.setState({modalTrigger: true})}

  closeModal = () => { this.setState({ modalTrigger: false})}

  submitModal = () => { 
    this.setState({ modalTrigger: false})
    this.toggleCell(this.state.cell_id)
  }

  toggleCell = () => {
    const { filled, score, cell_id, potential } = this.state
    this.props.rollClicked && 
      (filled[cell_id] = true, score[cell_id] = potential[cell_id])
    this.setState ({ filled: filled, score: score })
    this.props.handleTableChange()
  }

	componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      if (this.props.roll === 0) {
        this.resetTable()
      } else if (this.props.pips !== prevProps.pips) {
          this.organizeDice()
      } else if (this.props.tableClicked !== prevProps.tableClicked) {
        this.checkComplete()
      }
    }
  }

  resetTable = () => {
    this.setState({
      active: [false, false, false, false, false, false, false,
        false, false, false, false, false, false],
      potential: [0,0,0,0,0,0,0,0,0,0,0,0,0],
      filled: [false, false, false, false, false, false, false,
        false, false, false, false, false, false],
      score: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      yahtzees: '',
      cell_id: null,
      modalTrigger: false,
      modalMessage: '',
    })
  }
  
  checkComplete = () => {
    !this.state.filled.includes(false) && this.props.gameOver()
  }

	organizeDice = () => {
    let diceObject = {}
    let diceArray = []
    this.props.pips.forEach(pip => { diceObject[pip] = (diceObject[pip] || 0)+1})
    diceArray[0] = Object.values(diceObject).includes(2) //any pairs?
    diceArray[1] = Object.values(diceObject).includes(3) //any triples?
    diceArray[2] = Object.values(diceObject).includes(4) //any quadruples?
    diceArray[3] = Object.values(diceObject).includes(5) //any yahtzees?
    let sortedPips = Object.keys(diceObject)             
    diceArray[4] =((sortedPips.length === 5 &&           //any fourconsecutive or fiveconsecutive?
        (sortedPips[4] - sortedPips[1] === 3 || sortedPips[3] - sortedPips[0] === 3)) ||
        (sortedPips.length === 4 && sortedPips[3] - sortedPips[0] === 3))
    diceArray[5] = (sortedPips.length === 5 && sortedPips[4] - sortedPips[0] === 4)
    this.updateTable(diceArray)
  }
  
  updateTable = (diceArray) => {
    let newActive = [...this.state.active]
    let newPotential = [...this.state.potential]
    let bonus = this.state.yahtzees
    let bonusScore = this.state.score
    const {pips} = this.props
    //UPPER SECTION
		for (let i = 0; i <= 5; i++) {
			let numberOfDice = pips.filter(x => x===i).length;
      pips.includes(i) ? (newActive[i] = true, newPotential[i] = numberOfDice*(i+1)) 
                       : (newActive[i] = false, newPotential[i] = 0 )
    }
    //LOWER SECTION
    let diceSum = (pips.reduce((sum, pips) =>  sum + pips)) + 5 
    newActive[6] = diceArray.slice(1,4).some(elem => !!elem)
    newActive[7] = diceArray.slice(2,4).some(elem => !!elem)
    newActive[8] = diceArray[0] && diceArray[1]
    newActive[9] = diceArray[4]
    newActive[10] = diceArray[5]
    newActive[11] = diceArray[3]
    newActive[12] = (this.props.roll === 3)

    newActive[6] ? (newPotential[6] = diceSum) : (newPotential[6] = 0)
    newActive[7] ? (newPotential[7] = diceSum) : (newPotential[7] = 0)
    newActive[8] ? (newPotential[8] = 25) : (newPotential[8] = 0)
    newActive[9] ? (newPotential[9] = 30) : (newPotential[9] = 0)
    newActive[10] ? (newPotential[10] = 40) : (newPotential[10] = 0)
    newActive[11] ? (newPotential[11] = 50) : (newPotential[11] = 0)
    newPotential[12] = diceSum
    if (diceArray[3] && this.state.filled[11]) {bonus += 'X'} 
    bonusScore[13] = bonus.length * 100
    this.setState({
      active: newActive,
      potential: newPotential,
      yahtzees: bonus,
      score: bonusScore,
    })
  }

  render() {
    return (
      <div className="scorecard-canvas">
        <Modal modalTrigger={this.state.modalTrigger} 
               closeModal={this.closeModal}
               submitModal={this.submitModal}
               message={this.state.modalMessage} />
        <table className="upper-scorecard">
          <th colSpan="2">Upper Section</th>
          <th>Score</th>
          <tbody>
            <Rows items={UPPER_ITEMS}
                  active={this.state.active}
                  potential={this.state.potential}
                  filled={this.state.filled}
                  score={this.state.score}
                  toggleCell={this.handleCellClick} />
            <UpperSums score={this.state.score} filled={this.state.filled}/>
            </tbody>
        </table>
        <table className="lower-scorecard">
          <th colSpan="2">Lower Section</th>
          <th>Score</th>
           <tbody>
            <Rows items={LOWER_ITEMS}
                  active={this.state.active}
                  potential={this.state.potential}
                  filled={this.state.filled}
                  score={this.state.score}
                  toggleCell={this.handleCellClick} />
            <Bonus yahtzees={this.state.yahtzees} />
            <LowerSums score={this.state.score} filled={this.state.filled}/>
            </tbody>
        </table>
      </div>
    )
  }
}

const INITIAL_STATE = {
  active: [false, false, false, false, false, false, false,
    false, false, false, false, false, false],
  potential: [0,0,0,0,0,0,0,0,0,0,0,0,0],
  filled: [false, false, false, false, false, false, false,
    false, false, false, false, false, false],
  score: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  yahtzees: '',
  cell_id: null,
  modalTrigger: false,
  modalMessage: '',
}

const UPPER_ITEMS = [
  {name: 'Aces', description: 'Total of all Aces', index: 0},
  {name: 'Twos', description: 'Total of all Twos', index: 1},
  {name: 'Threes', description: 'Total of all Threes', index: 2},
  {name: 'Fours', description: 'Total of all Fours', index: 3},
  {name: 'Fives', description: 'Total of all Fives', index: 4},
  {name: 'Sixes', description: 'Total of all Sixes', index: 5},
]

const LOWER_ITEMS = [
  {name: 'Three of a Kind', description: 'Total of all Dice', index: 6},
  {name: 'Four of a Kind', description: 'Total of all Dice', index: 7},
  {name: 'Full House', description: 'Score 25', index: 8},
  {name: 'Small Straight', description: 'Score 30', index: 9},
  {name: 'Large Straight', description: 'Score 40', index: 10},
  {name: 'YAHTZEE', description: 'Score 50', index: 11},
  {name: 'Chance', description: 'Total of All Dice', index: 12},
]

export default hot (module)(TableContainer);