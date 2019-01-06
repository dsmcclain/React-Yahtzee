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
			images: [one, two, three, four, five, six]
		}
	}

	render() {
		return (
			<img src={this.state.images[this.props.pips]} />
		);
	}
}
export default hot(module)(Dice);