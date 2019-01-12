import React, { Component } from "react";
import {hot} from "react-hot-loader";
import DiceRoll from "./DiceRoll.js";
import RollButton from "./RollButton.js";
import Scorecard from "./Scorecard.js"
import "./DiceBar.css";

class DiceBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roll: 0,
			reroll: false,
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (this.state.roll === 3) {
			this.setState({ 
				reroll: true,
				roll: 1,
			})
		} else {
			this.setState({reroll: false});
			const rollCount = this.state.roll;
			this.setState({roll: rollCount + 1});
		}
	}

	render () {
		return (
			<div className="dice-area">
					<RollButton roll={this.state.roll} handleClick={this.handleClick}/>
					<h1>You have rolled {this.state.roll} {this.state.roll === 1 ? 'time' : 'times'}</h1>
				<div className="dice-bar">
					<DiceRoll roll={this.state.roll} reroll={this.state.reroll}/>
				</div>
				<Scorecard />
			</div>
		);
	}
}

export default hot (module)(DiceBar);