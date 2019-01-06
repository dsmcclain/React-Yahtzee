import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Dice from "./Dice.js";
import "./DiceBar.css";

class DiceBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pipsA: 0,
			pipsB: 0,
			pipsC: 0,
			pipsD: 0,
			pipsE: 0,
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
			pipsA: rollA,
			pipsB: rollB,
			pipsC: rollC,
			pipsD: rollD,
			pipsE: rollE,
		});
	}

	render () {
		return (
			<div className="dice-area">
				<button id="roll-btn"
							className="roll-button"
							onClick={this.clickHandler}>Roll!</button>
				<div className="dice-bar">
					<Dice pips={this.state.pipsA} />
					<Dice pips={this.state.pipsB} />
					<Dice pips={this.state.pipsC} />
					<Dice pips={this.state.pipsD} />
					<Dice pips={this.state.pipsE} />
				</div>
			</div>
		);
	}
}

export default hot (module)(DiceBar);