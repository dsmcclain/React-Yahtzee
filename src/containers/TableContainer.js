import React, { Component } from "react";
import {hot} from "react-hot-loader";
import ScoreTable from "./ScoreTable.js";

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
			active: [false, false, false, false, false, false],
      total: [0,0,0,0,0,0],
		}
  }

  // LOGIC FOR REAL-TIME UPDATING OF SCORES IN TABLE

  // triggered when dice change
	componentDidUpdate(prevProps) {
		if (this.props.pips !== prevProps.pips) {
			this.checkDice(this.props.pips);
		}
	}

  // determine what scoring options are available for user and
  // calculate their values
	checkDice(pips) {
		let newActive = [...this.state.active];
		let newTotal = [...this.state.total];
		for (let i = 0; i <= 5; i++) {
			let count = pips.filter(x => x===i).length;
			pips.includes(i) ? (
				newActive[i] = true,
				newTotal[i] = count*(i+1)
			) : (  
				newActive[i] = false,
				newTotal[i] = 0 );
    }
    // call setState with updater function to protect against
    // bugs resulting from asynchronous updating
		this.setState((state) => ({ active: newActive }))
		this.setState((state) => ({ total: newTotal }))
	}	

  render() {
    return (
      <div>
        <ScoreTable upperItems={UPPER_ITEMS}
                    lowerItems={LOWER_ITEMS}
                    active={this.state.active}
                    total={this.state.total} 
                    pips={this.props.pips}
                    roll={this.props.roll}/>
      </div>
    );
  }
}

const UPPER_ITEMS = [
  {name: 'Aces', description: 'Total of all Aces'},
  {name: 'Twos', description: 'Total of all Twos'},
  {name: 'Threes', description: 'Total of all Threes'},
  {name: 'Fours', description: 'Total of all Fours'},
  {name: 'Fives', description: 'Total of all Fives'},
  {name: 'Sixes', description: 'Total of all Sixes'},
];

const LOWER_ITEMS = [
  {name: 'Three of a Kind', description: 'Total of all Dice'},
  {name: 'Four of a Kind', description: 'Total of all Dice'},
  {name: 'Full House', description: 'Score 25'},
  {name: 'Small Straight', description: 'Score 30'},
  {name: 'Large Straight', description: 'Score 40'},
  {name: 'YAHTZEE', description: 'Score 50'},
  {name: 'Chance', description: 'Total of All Dice'},
  {name: 'Bonus YAHTZEES', description: 'Score 100 each'},
];


export default hot (module)(TableContainer);