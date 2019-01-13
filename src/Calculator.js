import React, {Component} from "react";
import {hot} from "react-hot-loader";

class Calculator extends Component {
	constructor(props) {
		super(props);
	}

	/* 
	-sort this.props.pips into diceArray
	-diceArray.foreach((dice) => {
		switch (dice) {
			case 1:
				Aces++
				etc.
		}
	})
	-if multiples.any > 2 -> 3 of a kind
	-if multiples.any > 3 -> 4 of a kind
	-if multiples.any > 4 -> Yahtzee
	-also check fullhouse
	-and sm straight
	-and large straight
	-some way to make these functions trigger booleans, which determine
		if specific cells in the scorecard table are editable
	*/


}

export default hot (module)(Calculator);