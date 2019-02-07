import React, { Component } from "react";
import {hot} from "react-hot-loader";
import DiceRoller from "./DiceRoller.js";
import RollButton from "../components/RollButton.js";
import "../styles/DiceContainer.css";

class DiceContainer extends Component {
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
			<div className="app-container">
				<RollButton roll={this.state.roll} handleClick={this.handleClick}/>
				<h2 className="roll-count">
					You have {3 - this.state.roll}
					{this.state.roll === 2 ? ' roll' : ' rolls'} remaining
				</h2>
				<DiceRoller roll={this.state.roll} reroll={this.state.reroll}/>
			</div>
		);
	}
}

export default hot (module)(DiceContainer);