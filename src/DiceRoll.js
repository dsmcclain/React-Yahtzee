import React, {Component} from "react";
import {hot} from "react-hot-loader";
import Dice from "./Dice.js";

class DiceRoll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pips: [0,0,0,0,0],
			hold: [false, false, false, false, false],
		}
		this.toggleHold = this.toggleHold.bind(this);
		this.reroll = this.reroll.bind(this);
		this.rollDice = this.rollDice.bind(this);
	}

	// if roll button is clicked, check if reroll, else check if dice has hold
	componentDidUpdate(prevProps) {
		if (this.props.roll !== prevProps.roll) {
			if (this.props.reroll) {
				this.reroll();
			} else {
				this.rollDice();
			}
		}
	}

	reroll() {
		this.setState({ hold: [false, false, false, false, false] });
		this.rollDice();
	}

	rollDice() {
		let newPips = [...this.state.pips];
		let holds = [...this.state.hold];
		for (let i = 0; i < 5; i++){
			if (!holds[i]) {
				const num = Math.floor(Math.random() * 6);
				newPips[i] = num;
			}
		}
		this.setState({pips: newPips});
	}

	toggleHold(id) {
		let holds = this.state.hold;
		holds[id] = !holds[id];
		this.setState({hold: holds});
		console.log(holds);
		console.log(this.state.hold);
	}

	render() {
		return(
			<Dice id={0} pips={this.state.pips[0]} hold={this.state.hold[0]} toggleHold={this.toggleHold} />
		)
	}
}

export default hot(module)(DiceRoll);