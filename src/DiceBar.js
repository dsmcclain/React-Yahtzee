import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./DiceBar.css";

// import images of dice faces
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
			images: [one, two, three, four, five, six],
			pipsA: 0,
			pipsB: 1,
			pipsC: 2,
			pipsD: 3,
			pipsE: 4,
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
					<img src={this.state.images[this.state.pipsA]} alt="dice-one" />
					<img src={this.state.images[this.state.pipsB]} alt="dice-two" />
					<img src={this.state.images[this.state.pipsC]} alt="dice-three" />
					<img src={this.state.images[this.state.pipsD]} alt="dice-four" />
					<img src={this.state.images[this.state.pipsE]} alt="dice-five" />
				</div>
			</div>
		);
	}
}

export default hot (module)(DiceBar);