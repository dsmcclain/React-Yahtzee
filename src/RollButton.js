import React, { Component } from "react";
import PropTypes from 'prop-types';
import Dice from "./Dice.js";
import"./DiceBar.css";

class RollButton extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		const { roll, onRollClick } = this.props
		return (
				<button id="roll-btn"
						className={`roll-button${roll === 3? ' reroll' : ''}`}
						onClick={onRollClick}>
						{roll === 3? 'Reroll!' : 'Roll!'}</button>
		)
	}
}

RollButton.propTypes = {
	onRollClick: PropTypes.func.isRequired,
}

export default RollButton;