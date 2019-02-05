import React, {Component} from "react";
import {hot} from "react-hot-loader";
import Cell from "../components/Cell.js";

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: [false, false, false, false, false, false],
			total: [0,0,0,0,0,0],
		}
	}

	// When dice change, call functions to check for values of each type
	componentDidUpdate(prevProps) {
		if (this.props.pips !== prevProps.pips) {
			this.checkDice(this.props.pips);
		}
	}

	checkDice(pips) {
		let newActive = [...this.state.active];
		let newTotal = [...this.state.total];
		for (let i = 0; i <= 5; i++) {
			let count = pips.filter(x => x===i).length;
			pips.includes(i) ? (
				newActive[i] = true,
				newTotal[i] = count*(i+1)
			) : (  
				newActive[i] = false,
				newTotal[i] = 0 );
		}
		this.setState((state) => ({ active: newActive })),
		this.setState((state) => ({ total: newTotal }));
	}	

	render() {
		return (
			<div>
				<Cell eligible={this.state.active[0]} suggestion={this.state.total[0]} />
				<Cell eligible={this.state.active[1]} suggestion={this.state.total[1]} />
				<Cell eligible={this.state.active[2]} suggestion={this.state.total[2]} />
				<Cell eligible={this.state.active[3]} suggestion={this.state.total[3]} />
				<Cell eligible={this.state.active[4]} suggestion={this.state.total[4]} />
				<Cell eligible={this.state.active[5]} suggestion={this.state.total[5]} />
			</div>
		)
	}
}

export default hot (module)(Calculator);