import React, { Component } from "react";
import {hot} from "react-hot-loader";

// import images of dice faces
import one from './images/one.png';
import two from './images/two.png';
import three from './images/three.png';
import four from './images/four.png';
import five from './images/five.png';
import six from './images/six.png';

class Dice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hold: false,
			pips: 0,
		}
		this.holdDice = this.holdDice.bind(this);
		this.reroll = this.reroll.bind(this);
		this.rollDice = this.rollDice.bind(this);
	}

	// if roll button is clicked, check if reroll, else check if dice has hold
	componentDidUpdate(prevProps) {
		if (this.props.roll !== prevProps.roll) {
			if (this.props.reroll) {
				this.reroll();
			} else if (!this.state.hold) {
				this.rollDice();
			}
		}
	}

	reroll() {
		this.setState({ hold: false });
		this.rollDice();
	}

	rollDice() {
		const num = Math.floor(Math.random() * 6);
		this.setState({pips: num});
	}

	holdDice() {
		this.setState({hold: !this.state.hold});
	}

	//images array is used to select imported images based on pips state
	render() {
		const images = [one, two, three, four, five, six]
		return (
			<div className={`dice-container ${this.state.hold ? "hold" : "free"}`}>
				<img src={images[this.state.pips]} onClick={this.holdDice} />
			</div>
		);
	}
}
export default hot(module)(Dice);