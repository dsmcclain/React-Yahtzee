import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./DiceBar.css";
import six from './images/six.png';

class DiceBar extends Component {
	render () {
		return (
			<img src={six} alt="Six" />
		);
	}
}

export default hot (module)(DiceBar);