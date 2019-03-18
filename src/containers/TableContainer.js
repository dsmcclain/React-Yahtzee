import React, { Component } from "react"
import {hot} from "react-hot-loader"
import Rows from "../components/Rows.js"
import UpperSums from "../components/UpperSums.js"
import LowerSums from "../components/LowerSums.js"
import Bonus from "../components/Bonus.js"
import Modal from "../components/Modal.js"
import "../styles/ScoreTable.css"

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.handleCellClick = this.handleCellClick.bind(this)
    this.setModalMessage = this.setModalMessage.bind(this)
    this.toggleCell = this.toggleCell.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.submitModal = this.submitModal.bind(this)
    this.checkComplete = this.checkComplete.bind(this)
    this.resetScores = this.resetScores.bind(this)
  }

  handleCellClick(cell_id) {
    if (this.props.roll !== 0 && !this.state.filled[cell_id]) {
      if (this.props.roll < 3 || this.state.potential[cell_id] === 0 ) {
        !this.props.tableClicked && this.setModalMessage(cell_id)
      } else {
        this.toggleCell(cell_id)
      }
    }
  }

  setModalMessage(cell_id) {
    if (this.props.roll < 3 ) {
      let message = 'Are you sure you want to end your turn? You can still roll again.'
      this.state.potential[cell_id] === 0 && 
        (message += ' (This will result in a score of zero for this item.)')
      this.setState({ 
        cell_id: cell_id,
        modalMessage: message},
        () => {this.openModal()})
    } else if (this.state.potential[cell_id] === 0) {
      for (let i = 0; i < 15; i++) {  //better way to do this? if only the 'potential' state didn't apply to already filled cells
        if (!this.state.filled[i] && this.state.potential[i]) {
          this.setState({ 
            cell_id: cell_id, 
            modalMessage: 'Are you sure you want to put a zero here? You could score more points elsewhere.'}, 
            () => {this.openModal()})
    }}}
  }

  openModal() { this.setState({modalTrigger: true})}

  closeModal(){ this.setState({ modalTrigger: false })}

  submitModal(){ 
    this.setState({ modalTrigger: false })
    this.toggleCell(this.state.cell_id)
  }

  //changes scorecard
  toggleCell(cell_id) {
    let fills = this.state.filled;
    let scores = this.state.score;

    this.props.rollClicked && 
      (fills[cell_id] = true, 
        scores[cell_id] = this.state.potential[cell_id])
    this.setState ({
      filled: fills,
      score: scores,
    })
    this.props.handleTableChange()
  }

  // triggered when dice change
	componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.roll === 0) {
        this.resetScores()
      } else if (this.props.pips !== prevProps.pips) {
          this.checkDice(this.props.pips)
      } else if (this.props.tableClicked !== prevProps.tableClicked) {
        this.checkComplete()
      }
    }
  }

  resetScores() {
    this.setState({
      active: [false, false, false, false, false, false, false,
        false, false, false, false, false, false],
      potential: [0,0,0,0,0,0,0,0,0,0,0,0,0],
      filled: [false, false, false, false, false, false, false,
        false, false, false, false, false, false],
      score: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      yahtzees: '',
      cellcell_id: null,
      modalTrigger: false,
      modalMessage: '',
    })
  }
  
  checkComplete() {
    !this.state.filled.includes(false) && this.props.gameOver()
  }

  // Logic for real-time updating of scoring options on scoretable
	checkDice(pips) {
		let newActive = [...this.state.active];
    let newPotential = [...this.state.potential];
    let bonus = this.state.yahtzees;
    let bonusScore = this.state.score;
    
    //Extract dice information from pips
    let diceObject = {}
    let diceSum = 0
    pips.forEach(dice => {
      diceObject[dice] = (diceObject[dice] || 0)+1
      diceSum = diceSum + dice + 1 })
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
    
    //SCORING OPTIONS FOR UPPER SECTION
		for (let i = 0; i <= 5; i++) {
			let count = pips.filter(x => x===i).length;
			pips.includes(i) ? (
				newActive[i] = true,
				newPotential[i] = count*(i+1)
			) : (  
				newActive[i] = false,
				newPotential[i] = 0 )
    }
  
    //SCORING OPTIONS FOR LOWER SECTION
    newActive[6] = triple || quadruple || yahtzee
    newActive[7] = quadruple || yahtzee
    newActive[8] = triple && pair
    newActive[9] = fourConsecutive
    newActive[10] = fiveConsecutive
    newActive[11] = yahtzee
    newActive[12] = (this.props.roll === 3)

    newActive[6] ? (newPotential[6] = diceSum) : (newPotential[6] = 0)
    newActive[7] ? (newPotential[7] = diceSum) : (newPotential[7] = 0)
    newActive[8] ? (newPotential[8] = 25) : (newPotential[8] = 0)
    newActive[9] ? (newPotential[9] = 30) : (newPotential[9] = 0)
    newActive[10] ? (newPotential[10] = 40) : (newPotential[10] = 0)
    newActive[11] ? (newPotential[11] = 50) : (newPotential[11] = 0)
    newPotential[12] = diceSum
    if (yahtzee && this.state.filled[11]) {bonus += 'X'} 
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