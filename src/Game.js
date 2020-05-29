import React, { Component } from "react";
import Board from "./Board";
/**
 * Compononent for Game
 * @author Kobe Kyle Relativo
 */
class Game extends Component {
  state = {
    columnCount: 8,
    rowCount: 10,
    squares: Array(8)
      .fill(0)
      .map((row) => new Array(10).fill(0)),
    clicked: Array(8)
      .fill(0)
      .map((row) => new Array(10).fill(0)),
    history: [],
    shortestPath: [],
    loading: false,
  };

  handleBoxClick(column, row) {
    var duplicateSquare = this.state.squares;
    var duplicateHistory = this.state.history;
    var clickedSquareValue = duplicateSquare[column][row];

    if (this.checkIfSquareIsObstacle(clickedSquareValue)) {
      alert("Cannot Move to Obstacle");
      return;
    }
    var currentSquare = duplicateHistory[duplicateHistory.length - 1];
    if (this.checkIfMoveIsValid(currentSquare, column, row) === false) {
      alert("Please only move 1 box down or right to the current box");
      return;
    }
    duplicateSquare[column][row] = 1;
    this.setState({
      squares: duplicateSquare,
    });

    duplicateHistory.push([column, row]);
    this.setState({
      history: duplicateHistory,
    });
    if (this.checkSquareIsAtEnd(column, row)) {
      var loading = this.state.loading;
      loading = true;
      this.setState({
        loading: loading,
      });
      alert("Already at End");
      this.checkFastestPath();
    }
  }

  checkSquareIsAtEnd(column, row) {
    var columnCount = this.state.columnCount;
    var rowCount = this.state.rowCount;
    var columnCountMinusOne = columnCount - 1;
    var rowCountMinusOne = rowCount - 1;
    if (column === columnCountMinusOne && row === rowCountMinusOne) {
      return true;
    } else {
      return false;
    }
  }

  checkSquareIsAtEndRowColumn(column, row) {
    if (
      column === this.state.columnCount - 1 ||
      row === this.state.rowCount - 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * This function checks if the square is at the very bottom and check if its right path has clear path
   * @param {*} col
   * @param {*} row
   */
  checkIfRightPathHasObstacle(col, row) {
    var index = 0;
    var hasObstacle = false;
    var duplicateSquares = this.state.squares;
    for (index = 0; index < duplicateSquares[col].length; index++) {
      if (duplicateSquares[col][index] === 2 && row < index) {
        hasObstacle = true;
        break;
      }
    }
    return hasObstacle;
  }

  checkIfBottomPathHasObstacle(col, row) {
    var index = 0;
    var hasObstacle = false;
    var duplicateSquares = this.state.squares;
    for (index = 0; index < duplicateSquares.length; index++) {
      if (duplicateSquares[index][row] === 2 && col < index) {
        hasObstacle = true;
        break;
      }
    }
    return hasObstacle;
  }

  //TODO FIX WHEN KUNG NANAS PINAKAUBOS PERO MOHATAG SIYAG ONE KAY IYANg RIGHT DILI OBSTACLE
  paths(squares, col, row, paths) {
    var squareValue = squares[col][row];

    if (
      col === this.state.columnCount - 1 &&
      this.checkIfRightPathHasObstacle(col, row)
    ) {
      return 0;
    }

    if (
      row === this.state.rowCount - 1 &&
      this.checkIfBottomPathHasObstacle(col, row)
    ) {
      return 0;
    }

    if (this.checkIfSquareIsObstacle(squareValue)) {
      return 0;
    }
    if (this.checkSquareIsAtEndRowColumn(col, row)) {
      return 1;
    }
    if (paths[col][row] === 0) {
      paths[col][row] =
        this.paths(squares, col + 1, row, paths) +
        this.paths(squares, col, row + 1, paths);
    }
    return paths[col][row];
  }

  checkFastestPath() {
    var squaresDuplicate = this.state.squares;
    var col = 0;
    var row = 0;
    var columnCount = this.state.columnCount;
    var rowCount = this.state.rowCount;
    var paths = Array(columnCount)
      .fill(0)
      .map((row) => new Array(rowCount).fill(0));

    var shortestPath = [];
    while (col < columnCount - 1 || row < rowCount - 1) {
      var bottom = 0;
      var right = 0;
      if (row !== rowCount - 1) {
        right = this.paths(squaresDuplicate, col, row + 1, paths);
      }
      if (col !== columnCount - 1) {
        bottom = this.paths(squaresDuplicate, col + 1, row, paths);
      }

      var bottomIsZero = bottom === 0;
      var rightIsZero = right === 0;

      if ((bottom < right && !bottomIsZero) || rightIsZero) {
        var squareValueBottom = squaresDuplicate[col + 1][row];
        if (!this.checkIfSquareIsObstacle(squareValueBottom)) {
          shortestPath.push([col + 1, row]);
          col++;
        } else {
          shortestPath.push([col, row + 1]);
          row++;
        }
      } else if (!rightIsZero) {
        var squareValueRight = squaresDuplicate[col][row + 1];
        if (!this.checkIfSquareIsObstacle(squareValueRight)) {
          shortestPath.push([col, row + 1]);
          row++;
        } else {
          shortestPath.push([col + 1, row]);
          col++;
        }
      } else {
        if (bottomIsZero) {
          col++;
        } else {
          row++;
        }
      }
    }

    //Put the gathered shortest paths to squares
    for (var i = 0; i < shortestPath.length; i++) {
      squaresDuplicate[shortestPath[i][0]][shortestPath[i][1]] = 4;
    }
    this.setState({
      squares: squaresDuplicate,
    });
    this.setState({
      loading: false,
    });
  }

  checkIfSquareIsObstacle(clickedSquareValue) {
    if (clickedSquareValue === 2) {
      return true;
    }
    return false;
  }

  /**
   * This function checks if the move is left or top
   * @param {} currentSquare
   * @param {*} column
   * @param {*} row
   */
  checkIfMoveIsValid(currentSquare, column, row) {
    var currentSquareColumn = currentSquare[0];
    var currentSquareRow = currentSquare[1];
    var moveIsRight =
      column === currentSquareColumn && row - currentSquareRow === 1;

    var moveIsBottom =
      column - currentSquareColumn === 1 && row === currentSquareRow;

    return moveIsRight || moveIsBottom;
  }

  componentDidMount() {
    var duplicateSquare = this.state.squares;
    this.putObstacles(duplicateSquare);
    this.initalizeStartingPoint(duplicateSquare);
    //Initlize history starting point
    var duplicateHistory = this.state.history;
    this.initializeHistory(duplicateHistory);
  }

  /**
   * This function initializes user starting point to the board and history
   * @param {} duplicateSquare square state
   */
  initalizeStartingPoint(duplicateSquare) {
    //Initialize user starting point
    duplicateSquare[0][0] = 1;
    this.setState({
      squares: duplicateSquare,
    });
  }

  initializeHistory(duplicateHistory) {
    duplicateHistory[0] = [0, 0];
    this.setState({
      history: duplicateHistory,
    });
  }

  randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

  restart() {
    var squaresDupl = Array(this.state.columnCount)
      .fill(0)
      .map((row) => new Array(this.state.rowCount).fill(0));

    var clickedDupl = Array(this.state.columnCount)
      .fill(0)
      .map((row) => new Array(this.state.rowCount).fill(0));

    var historyDupl = [];
    var shortestPathDupl = [];

    this.setState({
      squares: squaresDupl,
      clicked: clickedDupl,
      history: historyDupl,
      shortestPath: shortestPathDupl,
    });
    this.initializeHistory(historyDupl);
    this.initalizeStartingPoint(squaresDupl);
    this.putObstacles(squaresDupl);
  }

  putObstacles(duplicateSquare) {
    var columnCount = this.state.columnCount;
    var rowCount = this.state.rowCount;
    var columnCountMinusOne = columnCount - 1;
    var rowCountMinusOne = rowCount - 1;
    var index = 0;
    while (index < 15) {
      var col = this.randomInt(0, columnCount);
      var row = this.randomInt(0, rowCount);
      var squareValue = duplicateSquare[col][row];
      if (
        squareValue !== 2 &&
        squareValue !== 1 &&
        col !== columnCount &&
        row !== rowCount &&
        row !== rowCount &&
        col !== columnCount
      ) {
        if (col === columnCountMinusOne && row === rowCountMinusOne) {
          continue;
        }
        if ((col === 0 && row === 1) || (col === 1 && row === 0)) {
          continue;
        }
        var tempRowCountMinusTwo = rowCountMinusOne - 1;
        var tempCountMinusTwo = columnCountMinusOne - 1;
        if (
          (col === columnCountMinusOne && row === tempRowCountMinusTwo) ||
          (col === tempCountMinusTwo && row === rowCountMinusOne)
        ) {
          continue;
        }
        duplicateSquare[col][row] = 2;
        index++;
      }
    }

    this.setState({
      squares: duplicateSquare,
    });
  }

  showLoadingText() {
    return <h1>Please wait..</h1>;
  }

  showWelcome() {
    return (
      <h1>
        Find the shortest path from start to end. You can only move RIGHT or
        DOWN
      </h1>
    );
  }

  showHeaderEdits() {
    return (
      <div className="legendDiv">
        <div id="userPathDiv" className="colorlegend"></div> Your path
        <div id="shortestPathDiv" className="colorlegend"></div> Shortest path
        <div id="obstacleDiv" className="colorlegend"></div> Obstacle
        <button onClick={this.restart.bind(this)}>RESTART</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.showHeaderEdits()}
        {this.state.loading ? this.showLoadingText() : this.showWelcome()}
        <Board
          columnCount={this.state.columnCount}
          rowCount={this.state.rowCount}
          onClick={(column, row) => this.handleBoxClick(column, row)}
          squares={this.state.squares}
        ></Board>
      </div>
    );
  }
}

export default Game;
