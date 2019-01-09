import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./app.css";
import DiceBar from './DiceBar.js';

class App extends Component {
	render() {
		return (
			<div className="App">
			<DiceBar />
			</div>
		);
	}
}

export default hot(module)(App);