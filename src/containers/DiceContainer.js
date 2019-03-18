import React, { Component } from "react"
import {hot} from "react-hot-loader"
import RollButton from "../components/RollButton.js"
import RollCount from "../components/RollCount.js"
import Dice from "../components/Dice.js"
import GameOver from "../components/GameOver.js"
import TableContainer from "./TableContainer.js"
import "../styles/DiceContainer.css"

class DiceContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			roll: 0,
			pips: [0,0,0,0,0],
			hold: [false, false, false, false, false],
			rollClicked: true,
			tableClicked: false,
			gameOver: false,
		}
		this.gameOver = this.gameOver.bind(this)
		this.toggleHold = this.toggleHold.bind(this)
		this.handleTableChange = this.handleTableChange.bind(this)
		this.handleRollClick = this.handleRollClick.bind(this)
		this.newGame = this.newGame.bind(this)
		this.newTurn = this.newTurn.bind(this)
		this.rollDice = this.rollDice.bind(this)
	}

	gameOver() {
		this.setState({gameOver: true})
	}

	// triggered when dice are clicked (callback from Dice.js)
	toggleHold(id) {
		if (this.state.roll !== 0) {
			let holds = this.state.hold
			holds[id] = !holds[id]
			this.setState({hold: holds})
		}
	}

	// triggered when a cell in table is changed (callback from TableContainer.js)
	handleTableChange() {
		this.setState({tableClicked: true, rollClicked: false, roll: 3})
	}

	// triggered when roll button is clicked (callback from RollButton.js)
	handleRollClick() {
		if (this.state.gameOver) {
			this.newGame()
		} else if (this.state.roll === 3 && this.state.tableClicked) {
			this.newTurn()
		} else if (this.state.roll != 3) {
			this.newRoll()
		}
	}

	newGame() {
		this.setState({
			roll: 0,
			pips: [0,0,0,0,0],
			hold: [false, false, false, false, false],
			rollClicked: true,
			tableClicked: false,
			gameOver: false,
		})
	}

	newTurn() {
		this.setState({ roll: 1,
			hold: [false, false, false, false, false],
			rollClicked: true,
			tableClicked: false }, 
			() => {this.rollDice()})
	}

	newRoll() {
		const rollCount = this.state.roll
		this.setState({roll: rollCount + 1})
		this.rollDice()
	}

	rollDice() {
		let newPips = [...this.state.pips];
		for (let i = 0; i < 5; i++){
			if (!this.state.hold[i]) {
				const num = Math.floor(Math.random() * 6)
				newPips[i] = num
			}
		}
		this.setState({pips: newPips})
	}

	render () {
		return (
			<div className="app-container">
				<div className="dice-area">
					<div className="dice-bar">
						<Dice id={0} pips={this.state.pips[0]} hold={this.state.hold[0]} toggleHold={this.toggleHold} />
						<Dice id={1} pips={this.state.pips[1]} hold={this.state.hold[1]} toggleHold={this.toggleHold} />
						<Dice id={2} pips={this.state.pips[2]} hold={this.state.hold[2]} toggleHold={this.toggleHold} />
						<Dice id={3} pips={this.state.pips[3]} hold={this.state.hold[3]} toggleHold={this.toggleHold} />
						<Dice id={4} pips={this.state.pips[4]} hold={this.state.hold[4]} toggleHold={this.toggleHold} />
					</div>	
				<div>
				<div className = "roll-area">
					<div className="roll-canvas">
						<GameOver gameOver={this.state.gameOver} />
						<RollButton roll={this.state.roll} 
												handleRollClick={this.handleRollClick} 
												gameOver={this.state.gameOver}/>
						<RollCount roll={this.state.roll} />
					</div>
				</div>
				<TableContainer pips={this.state.pips} 
												roll={this.state.roll} 
												handleTableChange={this.handleTableChange}
												rollClicked={this.state.rollClicked}
												tableClicked={this.state.tableClicked}
												gameOver={this.gameOver} />
					</div>
				</div>
			</div>
		)
	}
}

export default hot (module)(DiceContainer);