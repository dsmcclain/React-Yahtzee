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
		this.rollDice = this.rollDice.bind(this);
		this.calculateScore = this.calculateScore.bind(this);
	}

	// if roll button is clicked, check if reroll applies. If so, reset hold state
	componentDidUpdate(prevProps) {
		if (this.props.roll !== prevProps.roll) {
			if (this.props.reroll) {
				this.setState({ hold: [false, false, false, false, false] });
				this.rollDice([false, false, false, false, false]); // necessary b/c state update is async
			} else {
				this.rollDice(this.state.hold);
			  }
		}
	}

	rollDice(holds) {
		let newPips = [...this.state.pips];
		console.log("holds is: " + holds);
		for (let i = 0; i < 5; i++){
			if (!holds[i]) {
				const num = Math.floor(Math.random() * 6);
				newPips[i] = num;
			}
		}
		this.setState({pips: newPips});
	}

	// triggered from Dice.js
	toggleHold(id) {
		let holds = this.state.hold;
		holds[id] = !holds[id];
		this.setState({hold: holds});
	}

	calculateScore() {
		var total = 0;
		this.state.pips.forEach((pips) => {
			total = total + pips + 1;
			console.log('total is now ' + total);
		});
		return total;
	}

	render() {
		return(
			<div className="dice-bar">
				<Dice id={0} pips={this.state.pips[0]} hold={this.state.hold[0]} toggleHold={this.toggleHold} />
				<Dice id={1} pips={this.state.pips[1]} hold={this.state.hold[1]} toggleHold={this.toggleHold} />
				<Dice id={2} pips={this.state.pips[2]} hold={this.state.hold[2]} toggleHold={this.toggleHold} />
				<Dice id={3} pips={this.state.pips[3]} hold={this.state.hold[3]} toggleHold={this.toggleHold} />
				<Dice id={4} pips={this.state.pips[4]} hold={this.state.hold[4]} toggleHold={this.toggleHold} />
				<Score pips={this.state.pips}/>
			</div>
		)
	}
}

const Score = (props) => {
	var total = 0;
		props.pips.forEach((pips) => {
			total = total + pips + 1;
			console.log('total is now ' + total);
		});
		return (
			<h1>the total is {total}</h1>
		)
}

export default hot(module)(DiceRoll);