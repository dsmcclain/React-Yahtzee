import React, { Component } from "react";
import {hot} from "react-hot-loader";

// import images of dice faces
import one from './images/one.png';
import two from './images/two.png';
import three from './images/three.png';
import four from './images/four.png';
import five from './images/five.png';
import six from './images/six.png';

function Dice(props){
	const images = [one, two, three, four, five, six]
	return (
		<img src={images[props.pips]} />
	);
}
export default hot(module)(Dice);