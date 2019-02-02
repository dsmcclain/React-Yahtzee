import React, {Component} from "react";
import {hot} from "react-hot-loader";
import Cell from "./Cell.js";

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			acesActive: false,
			acesTotal: 0,
		}
		this.checkAces = this.checkAces.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.pips !== prevProps.pips) {
			console.log('check aces');
			this.checkAces(this.props.pips);
		}
	}

	checkAces(pips) {
		console.log(pips);
		let count = pips.filter(function(x){return x==0}).length;
		pips.includes(0) ? 
			this.setState({
				acesActive: true,
				acesTotal: count,
			}) : 
			this.setState({
				acesActive: false,
			})
	}

	render() {
		return (
			<Cell eligible={this.state.acesActive} suggestion={this.state.acesTotal} />
		)
	}
}

export default hot (module)(Calculator);