import React, { Component } from "react"
import {hot} from "react-hot-loader"
import RollButton from "../components/RollButton.js"
import RollCount from "../components/RollCount.js"
import Dice from "../components/Dice.js"
import TableContainer from "./TableContainer.js"
import "../styles/DiceContainer.css"

class DiceContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roll: 0,
			pips: [0,0,0,0,0],
			hold: [false, false, false, false, false],
		}
		this.handleClick = this.handleClick.bind(this)
		this.rollDice = this.rollDice.bind(this)
		this.toggleHold = this.toggleHold.bind(this)
	}

	// triggered when dice are clicked (callback from Dice.js)
	toggleHold(id) {
		let holds = this.state.hold
		holds[id] = !holds[id]
		this.setState({hold: holds})
	}

	// triggered when roll button is clicked (callback from RollButton.js)
	handleClick() {
		if (this.state.roll === 3) {
			this.setState((state) => ({ roll: 1 }))
			this.setState((state) => ({ hold: [false, false, false, false, false] }))
			this.rollDice([false, false, false, false, false])
		} else {
			const rollCount = this.state.roll
			this.setState((state) => ({roll: rollCount + 1}))
			this.rollDice(this.state.hold)
		}
	}

	rollDice(holds) {
		let newPips = [...this.state.pips];
		for (let i = 0; i < 5; i++){
			if (!holds[i]) {
				const num = Math.floor(Math.random() * 6)
				newPips[i] = num
			}
		}
		this.setState({pips: newPips})
	}

	render () {
		return (
			<div className="app-container">
				<RollButton roll={this.state.roll} handleClick={this.handleClick}/>
				<RollCount roll={this.state.roll} />
				<div className="dice-area">
					<div className="dice-bar">
						<Dice id={0} pips={this.state.pips[0]} hold={this.state.hold[0]} toggleHold={this.toggleHold} />
						<Dice id={1} pips={this.state.pips[1]} hold={this.state.hold[1]} toggleHold={this.toggleHold} />
						<Dice id={2} pips={this.state.pips[2]} hold={this.state.hold[2]} toggleHold={this.toggleHold} />
						<Dice id={3} pips={this.state.pips[3]} hold={this.state.hold[3]} toggleHold={this.toggleHold} />
						<Dice id={4} pips={this.state.pips[4]} hold={this.state.hold[4]} toggleHold={this.toggleHold} />
					</div>	
					<div>
						<TableContainer pips={this.state.pips} roll={this.state.roll}/>
					</div>
				</div>
			</div>
		)
	}
}

export default hot (module)(DiceContainer);