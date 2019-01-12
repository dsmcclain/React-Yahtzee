import React, { Component } from "react";
import {hot} from "react-hot-loader";

class ScoreTable extends Component {
  render() {
    return(
      <table className="scorecard">
        <thead>
          Upper Section
        </thead>
     	<SectionRows items={this.props.upperItems}/>
        <thead>
          Lower Section
        </thead>
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
        <tbody>{rows}</tbody>
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
  {name: 'Aces', score: 3},
  {name: 'Twos', score: 6},
  {name: 'Threeeeeeees', score: 9}
];

const LOWER_ITEMS = [
  {name: 'Full House', score: 25, fulfilled: false},
  {name: 'YAHTZEE', score: 50, fulfilled: false},
];


export default hot (module)(Scorecard);