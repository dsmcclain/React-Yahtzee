//reducer should be:

const holdDice = (state = {}, action) => {
	return {
		...dice,
		hold: !dice.hold
	};
}


const rollDice = (state = {}, action) => {
		return {
			...dice,
			pips: action.num
		};
	})
}

const diceApp = (state = initialState, action) => {
	switch (action.type) {
		case 'TOGGLE_HOLD':
			return state.map(dice => {
				if (dice.id != action.id) {
					return dice;
				}

				return holdDice(dice, action);
		})
		case 'ROLL_DICE':
			return state.map(dice => {
				if (dice.hold) {
					return dice;
				}

				return rollDice(dice, action)
		})
		default:
			return state;			
	}
}

/*

*/