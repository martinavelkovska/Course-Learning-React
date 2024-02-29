import { useState } from "react";

// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];

export default function GameBoard({ onSelectSquare, board }) {
  // for the table  ,,,, go brisam activePlayerSymbol

  // let gameBoard = initialGameBoard; //override with data from our turns, if we have turns, if turns is an empty array we wanna leave board game as it is

  // for (const turn of turns) {
  //   //computed value that is derived from game turns state in the app component
  //   //extract information about the turn that occurred from that object we are storing in updatedTurns array: square propery: nested obj as value, player property:symbol as value

  //   const { square, player } = turn; //to pull them out of turn
  //   const { row, col } = square; // obj destructuring, pulling out from square

  //   gameBoard[row][col] = player; //update the row and column with the player symbol
  // }

  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function handleSelectSquare(rowIndex, colIndex) {
  //     //updating the state in inmutable way
  //     setGameBoard((prevGameBoard) => {
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ]; //new array that contains the old array elements as child elements
  //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedBoard;
  //     }); //update the game board

  //     onSelectSquare();
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* <button onClick={() => handleSelectSquare(rowIndex, colIndex)}> */}
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
                {/* we wanna use () => where we create new anonomys function which is then passed as a value to onClick */}
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
