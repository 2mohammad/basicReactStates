import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import _ from "lodash"
import { clone, cloneDeep } from "lodash"

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=6, ncols=6, chanceLightStartsOn=.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const initialBoard = 
      Array.from({length: ncols}, () => 
        Array.from({length: nrows}, () => 
          (Math.random() > chanceLightStartsOn ? 'Cell-lit' : '')
        ));
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const boardCopy = _.cloneDeep(oldBoard)
      console.log("here")
      console.log(boardCopy, coord)
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      boardCopy[1][0] = ""
      boardCopy[1][1] = ""
      boardCopy[1][2] = ""
      boardCopy[1][3] = ""
      boardCopy[1][4] = ""

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
      return boardCopy
    });
  }
  return (

    <div>
      <h3>Here</h3>
      {
        board.map(
          (element, idx) => 
            <tr>
              {
                element.map(
                  (x, idx2) => 
                    // <td>{`${x}`}</td>
                    <Cell 
                    isLit = {x}
                    flipCellsAroundMe = {flipCellsAround}
                    id = {idx+"-"+idx2}
                    />
                )
              }
            </tr>
        )
      }
    </div>
  )

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
