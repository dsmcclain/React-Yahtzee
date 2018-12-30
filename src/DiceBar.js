import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./DiceBar.css";

import one from './images/one.png';
import two from './images/two.png';
import three from './images/three.png';
import four from './images/four.png';
import five from './images/five.png';
import six from './images/six.png';

class DiceBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pips: one,
		}
		this.onClick = this.onClick.bind(this);
		this.rollDice = this.rollDice.bind(this);
	}

	onClick() {
		let roll = Math.floor(Math.random() * 6);
		this.rollDice(roll);
	}

	rollDice(roll) {
		const pipsArr = [one, two, three, four, five, six];
		console.log(roll);
		this.setState({ pips: pipsArr[roll]});
	}

	render () {
		return (
			<div className="dice-bar">
				<button id="roll-btn"
						className="roll-button"
						onClick={this.onClick}>Roll!</button>
				<img src={this.state.pips} alt="pips" />
			</div>
		);
	}
}

export default hot (module)(DiceBar);