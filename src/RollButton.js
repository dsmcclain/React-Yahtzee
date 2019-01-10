import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Dice from "./Dice.js";
import"./DiceBar.css";

class RollButton extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
				<button id="roll-btn"
						className="roll-button"
						onClick={this.props.handleClick}>Roll!</button>
		)
	}
}

export default hot (module)(RollButton);