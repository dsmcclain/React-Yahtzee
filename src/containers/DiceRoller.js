import React, {Component} from "react";
import {hot} from "react-hot-loader";
import Dice from "../components/Dice.js";
import TableContainer from "./TableContainer.js";

class DiceRoller extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pips: [0,0,0,0,0],
			hold: [false, false, false, false, false],
		}
		this.toggleHold = this.toggleHold.bind(this);
		this.rollDice = this.rollDice.bind(this);
	}

	// if roll button is clicked and reroll applies
	// reset 'hold' state for all dice, 
	// otherwise roll every dice with hold:false
	componentDidUpdate(prevProps) {
		if (this.props.roll !== prevProps.roll) {
			if (this.props.reroll) {
				this.setState({ hold: [false, false, false, false, false] });
				this.rollDice([false, false, false, false, false]);
			} else {
				this.rollDice(this.state.hold);
			  }
		}
	}

	rollDice(holds) {
		let newPips = [...this.state.pips];
		for (let i = 0; i < 5; i++){
			if (!holds[i]) {
				const num = Math.floor(Math.random() * 6);
				newPips[i] = num;
			}
		}
		this.setState({pips: newPips});
	}

	// triggered when dice are clicked (callback from Dice.js)
	toggleHold(id) {
		let holds = this.state.hold;
		holds[id] = !holds[id];
		this.setState({hold: holds});
	}

	render() {
		return(
			<div className="dice-area">
				<div className="dice-bar">
					<Dice id={0} pips={this.state.pips[0]} hold={this.state.hold[0]} toggleHold={this.toggleHold} />
					<Dice id={1} pips={this.state.pips[1]} hold={this.state.hold[1]} toggleHold={this.toggleHold} />
					<Dice id={2} pips={this.state.pips[2]} hold={this.state.hold[2]} toggleHold={this.toggleHold} />
					<Dice id={3} pips={this.state.pips[3]} hold={this.state.hold[3]} toggleHold={this.toggleHold} />
					<Dice id={4} pips={this.state.pips[4]} hold={this.state.hold[4]} toggleHold={this.toggleHold} />
				</div>	
				<div>
					<TableContainer pips={this.state.pips} roll={this.props.roll}/>
				</div>
			</div>
		)
	}
}

export default hot(module)(DiceRoller);