import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./styles/app.css";
import DiceBar from './containers/DiceBar.js';

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