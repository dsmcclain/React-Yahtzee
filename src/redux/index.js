/*STORE

{
	roll: 0,
	Dice: {
		"1": {
			pips: 0,
			hold: false
		}
		"2": {
			pips: 0,
			hold: false
		}
		"3": {
			pips: 0,
			hold: false
		}
		"4": {
			pips: 0,
			hold: false
		}
		"5": {
			pips: 0,
			hold: false
		}
	}
}
*/

//reducer

import { 
	TOGGLE_HOLD,
	ROLL_DICE,
 } from './actions'

const initialState = {
	hold: false
}


function diceApp(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_HOLD:
			return Object.assign({}, state, {
				dice: rollDice(state.dice, action)
			})
				//needs to be corrected to point to desired state in store
				...state.dice.index,
				hold: !hold
			}
		case ROLL_DICE: 
			return {
				...state.dice.index,
				pips: action.num,
			}
	}
	
}

//check out ../react-sample-app/DiceActions.js for updated reducer (i think)