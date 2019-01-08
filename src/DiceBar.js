import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Dice from "./Dice.js";
import "./DiceBar.css";

class DiceBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hold: true,
			DiceA: {pips: 0, hold: true},
			DiceB: {pips: 0, hold: false},
			DiceC: {pips: 0, hold: false},
			DiceD: {pips: 0, hold: false},
			DiceE: {pips: 0, hold: false}
		}
		this.clickHandler = this.clickHandler.bind(this);
		this.holdCallback = this.holdCallback.bind(this);
	}

	// use random number to assign images for each dice
	clickHandler() {
		const rollA = this.state.hold ? this.state.DiceA.pips : Math.floor(Math.random() * 6);
		const rollB = this.state.DiceB.hold ? this.state.DiceB.pips : Math.floor(Math.random() * 6);
		const rollC = this.state.DiceC.hold ? this.state.DiceC.pips : Math.floor(Math.random() * 6);
		const rollD = this.state.DiceD.hold ? this.state.DiceD.pips : Math.floor(Math.random() * 6);
		const rollE = this.state.DiceE.hold ? this.state.DiceE.pips : Math.floor(Math.random() * 6);

		this.setState({
			DiceA: {pips: rollA},
			DiceB: {pips: rollB},
			DiceC: {pips: rollC},
			DiceD: {pips: rollD},
			DiceE: {pips: rollE}
		});
	}

	holdCallback() {
		console.log("callback!");
		this.setState({ hold: !this.state.hold })
	}

	render () {
		return (
			<div className="dice-area">
				<button id="roll-btn"
							className="roll-button"
							onClick={this.clickHandler}>Roll!</button>
				<div className="dice-bar">
					<Dice pips={this.state.DiceA.pips} hold={this.state.hold} callback={this.holdCallback}/>
					<Dice pips={this.state.DiceB.pips} hold={this.state.DiceB.hold} />
					<Dice pips={this.state.DiceC.pips} hold={this.state.DiceC.hold} />
					<Dice pips={this.state.DiceD.pips} hold={this.state.DiceD.hold} />
					<Dice pips={this.state.DiceE.pips} hold={this.state.DiceE.hold} />
				</div>
			</div>
		);
	}
}

export default hot (module)(DiceBar);