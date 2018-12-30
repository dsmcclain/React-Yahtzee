import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./app.css";
import six from './six.png';

class App extends Component {
	render() {
		return (
			<div className="App">
			<h1>Hello, world! </h1>
			<img src={six} alt="Six" />
			</div>
		);
	}
}

export default hot(module)(App);