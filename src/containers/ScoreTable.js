import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Cell from "../components/Cell.js";
import "../styles/ScoreTable.css";

class ScoreTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filled: [false, false, false, false, false, false],
    }
  }


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

export default hot (module)(ScoreTable)