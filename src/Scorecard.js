import React, { Component } from "react";
import {hot} from "react-hot-loader";

class SectionRow extends Component {
  render() {
    return(
      <table className="scorecard">
      <tr>
        <th>
          Upper Section
        </th>
      </tr>
     	<UpperRows items={this.props.upperItems}/>
      <tr>
        <th>
          Lower Section
        </th>
      </tr>
      	
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

class UpperRows extends Component {
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
      <table>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

class Scorecard extends Component {
  render() {
    return (
      <div>
        <SectionRow upperItems={UPPER_ITEMS} lowerItems={LOWER_ITEMS} />
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