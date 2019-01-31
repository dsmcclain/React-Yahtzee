import React, { Component } from "react";
import {hot} from "react-hot-loader";

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
  {name: 'Threes', description: 'Total of all Threes', score: 9}
];

const LOWER_ITEMS = [
  {name: 'Full House', description: 'Two of a Kind + Three of a Kind', score: 25, fulfilled: false},
  {name: 'YAHTZEE', description: 'All Five Dice the Same', score: 50, fulfilled: false},
];


export default hot (module)(Scorecard);