import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Cell from "../components/Cell.js";
import "../styles/ScoreTable.css";

class ScoreTable extends Component {
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

// METHODS FOR GENERATING TABLE ROWS

class ItemRow extends Component {
  render() {
    const item = this.props.item;
    const index = this.props.index;

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

//PRESENTATIONAL COMPONENT FOR DISPLAYING TOTAL OF ALL DICE

const Score = (props) => {
	var total = 0;
		props.pips.forEach((pips) => {
			total = total + pips + 1;
		});
		return (
			<h1 className="score-count">
        Your {props.roll === 3 ? 'final' : ''} total is {total}
      </h1>
		)
}

const UPPER_ITEMS = [
  {name: 'Aces', description: 'Total of all Aces'},
  {name: 'Twos', description: 'Total of all Twos'},
  {name: 'Threes', description: 'Total of all Threes'},
  {name: 'Fours', description: 'Total of all Threes'},
  {name: 'Fives', description: 'Total of all Threes'},
  {name: 'Sixes', description: 'Total of all Threes'},
  {name: 'Subtotal', description: 'Total of all Scores'},
  {name: 'Bonus (If Subtotal > 63)', description: 'Score 35'},
  {name: 'Total', description: 'Subtotal + Bonus'},
];

const LOWER_ITEMS = [
  {name: 'Three of a Kind', description: 'Total of All Dice'},
  {name: 'Four of a Kind)', description: 'Total of All Dice'},
  {name: 'Full House', description: 'Score 25'},
  {name: 'Small Straight (Sequence of 4)', description: 'Score 30'},
  {name: 'Large Straight (Sequence of 5)', description: 'Score 40'},
  {name: 'YAHTZEE', description: 'Score 50'},
  {name: 'Chance', description: 'Total of All Dice'},
  {name: 'YAHTZEE Bonus (Additional YAHTZEEs)', description: 'Score 100'},
  {name: 'Upper Total', description: ' ⇒ '},
  {name: 'Lower Total', description: ' ⇒ '},
  {name: 'Grand Total', description: 'Upper Total + Lower Total'},
];


export default hot (module)(ScoreTable);