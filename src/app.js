import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./styles/app.css";
import DiceContainer from './containers/DiceContainer.js';

class App extends Component {
	render() {
		return (
			<div className="App">
			<DiceContainer />
			</div>
		);
	}
}

export default hot(module)(App);