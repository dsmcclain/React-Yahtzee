import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Dice from "./Dice.js";
import "./DiceBar.css";

class DiceBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hold: {DiceA: false, DiceB: false, DiceC: false, DiceD: false, DiceE: false},
			DiceA: {pips: 0, hold: true},
			DiceB: {pips: 0, hold: false},
			DiceC: {pips: 0, hold: false},
			DiceD: {pips: 0, hold: false},
			DiceE: {pips: 0, hold: false}
		}
		this.clickHandler = this.clickHandler.bind(this);
		this.holdCallbackA = this.holdCallbackA.bind(this);
		this.holdCallbackB = this.holdCallbackB.bind(this);
		this.holdCallbackC = this.holdCallbackC.bind(this);
		this.holdCallbackD = this.holdCallbackD.bind(this);
		this.holdCallbackE = this.holdCallbackE.bind(this);
	}

	// use random number to assign images for each dice
	clickHandler() {
		const rollA = this.state.hold.DiceA ? this.state.DiceA.pips : Math.floor(Math.random() * 6);
		const rollB = this.state.hold.DiceB ? this.state.DiceB.pips : Math.floor(Math.random() * 6);
		const rollC = this.state.hold.DiceC ? this.state.DiceC.pips : Math.floor(Math.random() * 6);
		const rollD = this.state.hold.DiceD ? this.state.DiceD.pips : Math.floor(Math.random() * 6);
		const rollE = this.state.hold.DiceE ? this.state.DiceE.pips : Math.floor(Math.random() * 6);

		this.setState({
			DiceA: {pips: rollA},
			DiceB: {pips: rollB},
			DiceC: {pips: rollC},
			DiceD: {pips: rollD},
			DiceE: {pips: rollE}
		});
	}

	holdCallbackA() {
		this.setState({ hold: {DiceA: !this.state.hold.DiceA} });
	}
	holdCallbackB() {
		this.setState({ hold: {DiceB: !this.state.hold.DiceB} });
	}
	holdCallbackC() {
		this.setState({ hold: {DiceC: !this.state.hold.DiceC} });
	}
	holdCallbackD() {
		this.setState({ hold: {DiceD: !this.state.hold.DiceD} });
	}
	holdCallbackE() {
		this.setState({ hold: {DiceE: !this.state.hold.DiceE} });
	}

	render () {
		return (
			<div className="dice-area">
				<button id="roll-btn"
							className="roll-button"
							onClick={this.clickHandler}>Roll!</button>
				<div className="dice-bar">
					<Dice pips={this.state.DiceA.pips} hold={this.state.hold.DiceA} callback={this.holdCallbackA}/>
					<Dice pips={this.state.DiceB.pips} hold={this.state.hold.DiceB} callback={this.holdCallbackB}/>
					<Dice pips={this.state.DiceC.pips} hold={this.state.hold.DiceC} callback={this.holdCallbackC}/>
					<Dice pips={this.state.DiceD.pips} hold={this.state.hold.DiceD} callback={this.holdCallbackD}/>
					<Dice pips={this.state.DiceE.pips} hold={this.state.hold.DiceE} callback={this.holdCallbackE}/>
				</div>
			</div>
		);
	}
}

export default hot (module)(DiceBar);