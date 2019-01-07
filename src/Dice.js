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
		}
		this.holdDice = this.holdDice.bind(this);
	}

	holdDice() {
		this.setState({ hold: !this.state.hold })
		console.log('state is now ' + this.state.hold);
	}

	render() {
		const images = [one, two, three, four, five, six]
		return (
			<div className={`dice-container ${this.state.hold ? "hold" : "free"}`}>
				<img src={images[this.props.pips]} onClick={this.holdDice} />
			</div>
		);
	}
}
export default hot(module)(Dice);