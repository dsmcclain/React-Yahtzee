import React, { Component } from "react";
import {hot} from "react-hot-loader";
import { isNullOrUndefined } from "util";
import Cell from "../components/Cell.js";
// import Calculator from './Calculator.js';
import "../styles/ScoreTable.css";

class ScoreTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
			active: [false, false, false, false, false, false],
			total: [0,0,0,0,0,0],
		}
  }

  // When dice change, call functions to check for values of each type
	componentDidUpdate(prevProps) {
		if (this.props.pips !== prevProps.pips) {
			this.checkDice(this.props.pips);
		}
	}

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
		this.setState((state) => ({ active: newActive })),
		this.setState((state) => ({ total: newTotal }));
	}	

  render() {
    return (
      <div>
        <Scorecard upperItems={UPPER_ITEMS}
                   lowerItems={LOWER_ITEMS}
                   active={this.state.active}
                   total={this.state.total} />
        <Score pips={this.props.pips} roll={this.props.roll}/>
      </div>
    );
  }
}

class Scorecard extends Component {
  render() {
    return(
      <div className="scorecard-canvas">
        <table className="upper-scorecard">
          <th colSpan="2">
            Upper Section
          </th>
          <th>Score</th>
            <SectionRows items={this.props.upperItems}
                         active={this.props.active}
                         total={this.props.total} />
        </table>
        {/* <table className="lower-scorecard">
          <th colSpan="2">
            Lower Section
          </th>
          <th>Score</th>
            <SectionRows items={this.props.lowerItems}/>
        </table> */}
      </div>
    );
  }
}

class ItemRow extends Component {
  render() {
    const item = this.props.item;
    const index = this.props.index;
    console.log(this.props.active[index])

    return (
    <tr>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <Cell eligible={this.props.active[index]} 
            suggestion={this.props.total[index]} />
    </tr>
    );
  }
}

class SectionRows extends Component {
  render() {
    const rows = [];
    
    this.props.items.forEach((item, index) => {
      rows.push(
        <ItemRow
          item={item}
          index={index} 
          active={this.props.active}
          total={this.props.total}/>
      );
    });

    return (
        rows
    );
  }
}

const Score = (props) => {
	var total = 0;
		props.pips.forEach((pips) => {
			total = total + pips + 1;
		});
		return (
			<h1 className="score-count">Your {props.roll === 3 ? 'final' : ''} total is {total}</h1>
		)
}

const UPPER_ITEMS = [
  {name: 'Aces', description: 'Total of all Aces', score: isNullOrUndefined},
  {name: 'Twos', description: 'Total of all Twos', score: isNullOrUndefined},
  {name: 'Threes', description: 'Total of all Threes', score: isNullOrUndefined},
  {name: 'Fours', description: 'Total of all Threes', score: isNullOrUndefined},
  {name: 'Fives', description: 'Total of all Threes', score: isNullOrUndefined},
  {name: 'Sixes', description: 'Total of all Threes', score: isNullOrUndefined},
  {name: 'Subtotal', description: 'Total of all Scores', score: isNullOrUndefined},
  {name: 'Bonus (If Subtotal > 63)', description: 'Score 35', score: 35, fulfilled: false},
  {name: 'Total', description: 'Subtotal + Bonus', score: isNullOrUndefined},
];

const LOWER_ITEMS = [
  {name: 'Three of a Kind', description: 'Total of All Dice', score: isNullOrUndefined},
  {name: 'Four of a Kind)', description: 'Total of All Dice', score: isNullOrUndefined},
  {name: 'Full House', description: 'Score 25', score: 25, fulfilled: false},
  {name: 'Small Straight (Sequence of 4)', description: 'Score 30', score: 50, fulfilled: false},
  {name: 'Large Straight (Sequence of 5)', description: 'Score 40', score: 50, fulfilled: false},
  {name: 'YAHTZEE', description: 'Score 50', score: 50, fulfilled: false},
  {name: 'Chance', description: 'Total of All Dice', score: isNullOrUndefined},
  {name: 'YAHTZEE Bonus (Additional YAHTZEEs)', description: 'Score 100', score: 100, fulfilled: false},
  {name: 'Upper Total', description: ' ⇒ ', score: isNullOrUndefined},
  {name: 'Lower Total', description: ' ⇒ ', score: isNullOrUndefined},
  {name: 'Grand Total', description: 'Upper Total + Lower Total', score: isNullOrUndefined},
];


export default hot (module)(ScoreTable);