import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Dice from "./Dice.js";
import RollButton from "./RollButton.js"
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
				roll: 0,
			})
		} else {
			this.setState({ reroll: false });
			const rollCount = this.state.roll;
			this.setState({roll: rollCount + 1});
		}
	}

	render () {
		return (
			<div className="dice-area">
					<RollButton handleClick={this.handleClick}/>
					<h1>You have rolled {this.state.roll} {this.state.roll === 1 ? 'time' : 'times'}</h1>
				<div className="dice-bar">
					<Dice roll={this.state.roll} reroll={this.state.reroll} />
					<Dice roll={this.state.roll} reroll={this.state.reroll} />
					<Dice roll={this.state.roll} reroll={this.state.reroll} />
					<Dice roll={this.state.roll} reroll={this.state.reroll} />
					<Dice roll={this.state.roll} reroll={this.state.reroll} />
				</div>
			</div>
		);
	}
}

export default hot (module)(DiceBar);