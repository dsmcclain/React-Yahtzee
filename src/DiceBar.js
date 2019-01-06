import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Dice from "./Dice.js";
import "./DiceBar.css";

class DiceBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			diceA: {pips: 0, hold: false},
			diceB: {pips: 0, hold: false},
			diceC: {pips: 0, hold: false},
			diceD: {pips: 0, hold: false},
			diceE: {pips: 0, hold: false},
		}
		this.clickHandler = this.clickHandler.bind(this);
	}

	// use random number to assign images for each dice
	clickHandler() {
		const rollA = Math.floor(Math.random() * 6);
		const rollB = Math.floor(Math.random() * 6);
		const rollC = Math.floor(Math.random() * 6);
		const rollD = Math.floor(Math.random() * 6);
		const rollE = Math.floor(Math.random() * 6);

		this.setState({
			diceA: {pips: rollA},
			diceB: {pips: rollB},
			diceC: {pips: rollC},
			diceD: {pips: rollD},
			diceE: {pips: rollE},
		});
	}

	render () {
		return (
			<div className="dice-area">
				<button id="roll-btn"
							className="roll-button"
							onClick={this.clickHandler}>Roll!</button>
				<div className="dice-bar">
					<Dice pips={this.state.diceA.pips} />
					<Dice pips={this.state.diceB.pips} />
					<Dice pips={this.state.diceC.pips} />
					<Dice pips={this.state.diceD.pips} />
					<Dice pips={this.state.diceE.pips} />
				</div>
			</div>
		);
	}
}

export default hot (module)(DiceBar);