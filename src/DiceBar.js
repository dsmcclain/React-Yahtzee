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
			pipsA: one,
			pipsB: two,
			pipsC: three,
			pipsD: four,
			pipsE: five,
		}
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		const pipsArr = [one, two, three, four, five, six];

		let roll = Math.floor(Math.random() * 6);
		this.setState({ pipsA: pipsArr[roll]});

		roll = Math.floor(Math.random() * 6);
		this.setState({ pipsB: pipsArr[roll]});

		roll = Math.floor(Math.random() * 6);
		this.setState({ pipsC: pipsArr[roll]});

		roll = Math.floor(Math.random() * 6);
		this.setState({ pipsD: pipsArr[roll]});

		roll = Math.floor(Math.random() * 6);
		this.setState({ pipsE: pipsArr[roll]});
	}

	render () {
		return (
			<div className="dice-area">
				<button id="roll-btn"
							className="roll-button"
							onClick={this.onClick}>Roll!</button>
				<div className="dice-bar">
					<img src={this.state.pipsA} alt="dice-one" />
					<img src={this.state.pipsB} alt="dice-two" />
					<img src={this.state.pipsC} alt="dice-three" />
					<img src={this.state.pipsD} alt="dice-four" />
					<img src={this.state.pipsE} alt="dice-five" />
				</div>
			</div>
		);
	}
}

export default hot (module)(DiceBar);