import React, { Component } from "react";

class Board extends Component {
  renderSquare(column, row, squreColor) {
    var text = "";
    if (column === 0 && row === 0) {
      text = <h3>START</h3>;
    }
    if (
      column === this.props.columnCount - 1 &&
      row === this.props.rowCount - 1
    ) {
      text = <h3>END</h3>;
    }

    return (
      <td
        id="boxText"
        onClick={() => this.props.onClick(column, row)}
        className={squreColor}
      >
        {text}
      </td>
    );
  }

  checkSquareColor(squareValue) {
    var squareColor;
    if (squareValue === 2) {
      squareColor = "squareObstacle";
    } else if (squareValue === 1) {
      squareColor = "clickedSquare";
    } else if (squareValue === 4) {
      squareColor = "shortestPathSquares";
    } else {
      squareColor = "square";
    }
    return squareColor;
  }

  render() {
    return (
      <div className="border-row">
        <table>
          <tbody>
            {this.props.squares.map((value, columnIndex) => {
              return (
                <tr>
                  {this.props.squares[columnIndex].map((valueRow, rowIndex) => {
                    return this.renderSquare(
                      columnIndex,
                      rowIndex,
                      this.checkSquareColor(valueRow)
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
