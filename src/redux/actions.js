//action types

export const TOGGLE_HOLD = 'TOGGLE_HOLD'
export const ROLL_DICE = 'ROLL_DICE'

{
	type: TOGGLE_HOLD,
	index: 0,
}
{
	type: ROLL_DICE,
	num: 0,
	index: 0,
}

//action creators

function toggleHold(index) {
	return { type: TOGGLE_HOLD, index }
}

function rollDice(index) {
	const num = Math.floor(Math.random() * 6);
	return { type: ROLL_DICE, num, index }
}

dispatch(toggleHold(index));
dispatch(rollDice(index));