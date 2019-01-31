import React, { Component } from "react";
import {hot} from "react-hot-loader";
import { isNull } from "util";
import "./Scorecard.css";

class ScoreTable extends Component {
  render() {
    return(
      <table className="scorecard">
        <th colspan="2">
          Upper Section
        </th>
        <th>Score</th>
     	<SectionRows items={this.props.upperItems}/>
        <th colspan="2">
          Lower Section
        </th>
        <th>Score</th>
      <SectionRows items={this.props.lowerItems}/>
      </table>
    );
  }
}

class ItemRow extends Component {
  render() {
    const item = this.props.item;
    
    return (
    <tr>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.score}</td>
    </tr>
    );
  }
}

class SectionRows extends Component {
  render() {
    const rows = [];
    
    this.props.items.forEach((item) => {
      rows.push(
        <ItemRow
          item={item}
          key={item.name} />
      );
    });

    return (
        rows
    );
  }
}

class Scorecard extends Component {
  render() {
    return (
      <div>
        <ScoreTable upperItems={UPPER_ITEMS} lowerItems={LOWER_ITEMS} />
      </div>
    );
  }
}

const UPPER_ITEMS = [
  {name: 'Aces', description: 'Total of all Aces', score: 3},
  {name: 'Twos', description: 'Total of all Twos', score: 6},
  {name: 'Threes', description: 'Total of all Threes', score: 9},
  {name: 'Fours', description: 'Total of all Threes', score: 9},
  {name: 'Fives', description: 'Total of all Threes', score: 9},
  {name: 'Sixes', description: 'Total of all Threes', score: 9},
  {name: 'Subtotal', description: 'Total of all Scores', score: 9},
  {name: 'Bonus (If Subtotal > 63', description: 'Score 35', score: 35, fulfilled: false},
  {name: 'Total', description: 'Subtotal + Bonus', score: 9},
];

const LOWER_ITEMS = [
  {name: 'Three of a Kind', description: 'Total of All Dice'},
  {name: 'Four of a Kind)', description: 'Total of All Dice'},
  {name: 'Full House', description: 'Score 25', score: 25, fulfilled: false},
  {name: 'Small Straight (Sequence of 4)', description: 'Score 30', score: 50, fulfilled: false},
  {name: 'Large Straight (Sequence of 5)', description: 'Score 40', score: 50, fulfilled: false},
  {name: 'YAHTZEE', description: 'Score 50', score: 50, fulfilled: false},
  {name: 'Chance', description: 'Total of All Dice', score: isNull},
  {name: 'YAHTZEE Bonus (Additional YAHTZEEs)', description: 'Score 100', score: 100, fulfilled: false},
  {name: 'Upper Total', description: ' ⇒ ', score: isNull},
  {name: 'Lower Total', description: ' ⇒ ', score: isNull},
  {name: 'Grand Total', description: 'Upper Total + Lower Total', score: isNull},
];


export default hot (module)(Scorecard);