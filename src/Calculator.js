import React, {Component} from "react";
import {hot} from "react-hot-loader";
import Cell from "./Cell.js";

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			acesActive: false,
			acesTotal: 0,
			twosActive: false,
			twosTotal: 0,
			threesActive: false,
			threesTotal: 0,
			foursActive: false,
			foursTotal: 0,
			fivesActive: false,
			fivesTotal: 0,
			sixesActive: false,
			sixesTotal: 0,
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.pips !== prevProps.pips) {
			console.log('check aces');
			this.checkAces(this.props.pips);
			this.checkTwos(this.props.pips);
			this.checkThrees(this.props.pips);
			this.checkFours(this.props.pips);
			this.checkFives(this.props.pips);
			this.checkSixes(this.props.pips);
		}
	}

	checkAces(pips) {
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

	checkTwos(pips) {
		let count = pips.filter(function(x){return x==1}).length;
		pips.includes(1) ? 
			this.setState({
				twosActive: true,
				twosTotal: count*2,
			}) : 
			this.setState({
				twosActive: false,
			})
	}

	checkThrees(pips) {
		let count = pips.filter(function(x){return x==2}).length;
		pips.includes(2) ? 
			this.setState({
				threesActive: true,
				threesTotal: count*3,
			}) : 
			this.setState({
				threesActive: false,
			})
	}

	checkFours(pips) {
		let count = pips.filter(function(x){return x==3}).length;
		pips.includes(3) ? 
			this.setState({
				foursActive: true,
				foursTotal: count*4,
			}) : 
			this.setState({
				foursActive: false,
			})
	}

	checkFives(pips) {
		let count = pips.filter(function(x){return x==4}).length;
		pips.includes(4) ? 
			this.setState({
				fivesActive: true,
				fivesTotal: count*5,
			}) : 
			this.setState({
				fivesActive: false,
			})
	}

	checkSixes(pips) {
		let count = pips.filter(function(x){return x==5}).length;
		pips.includes(5) ? 
			this.setState({
				sixesActive: true,
				sixesTotal: count*6,
			}) : 
			this.setState({
				sixesActive: false,
			})
	}

	render() {
		return (
			<div>
				<Cell eligible={this.state.acesActive} suggestion={this.state.acesTotal} />
				<Cell eligible={this.state.twosActive} suggestion={this.state.twosTotal} />
				<Cell eligible={this.state.threesActive} suggestion={this.state.threesTotal} />
				<Cell eligible={this.state.foursActive} suggestion={this.state.foursTotal} />
				<Cell eligible={this.state.fivesActive} suggestion={this.state.fivesTotal} />
				<Cell eligible={this.state.sixesActive} suggestion={this.state.sixesTotal} />
			</div>
		)
	}
}

export default hot (module)(Calculator);