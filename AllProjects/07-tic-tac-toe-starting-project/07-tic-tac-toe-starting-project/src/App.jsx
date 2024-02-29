import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { useState } from "react";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  //logic for who won
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]; //toj e pobednik
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]; //override with data from our turns, if we have turns, if turns is an empty array we wanna leave board game as it is, deeeper copy outer and inner arrays to restart the game we put ... map, copying the array

  for (const turn of gameTurns) {
    //computed value that is derived from game turns state in the app component
    //extract information about the turn that occurred from that object we are storing in updatedTurns array: square propery: nested obj as value, player property:symbol as value

    const { square, player } = turn; //to pull them out of turn
    const { row, col } = square; // obj destructuring, pulling out from square

    gameBoard[row][col] = player; //update the row and column with the player symbol
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner; //ako site polinja se zafanati i nema winner vrati true

  function handleSelectSquare(rowIndex, colIndex) {
    //which player clickd on which box
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X")); // koga kje bide x, sledno da bide o

    setGameTurns((prevTurns) => {
      // let currentPlayer = "X";
      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   //So if the latest stored turn in our existing turns state,
      //   currentPlayer = "O";
      // }
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]; //copying the existing turns, the latest turn is the first item in the

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    //update the players data , expect to get the symbol of the player for whom the name changed and the new name as arguments.
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
      //   And I wanna update my state based on my old state, because, of course, only one name of one player changes here and I don't wanna lose the name
      // and information for the other player.Therefore, in the end here, I get my previous players  and I'll return a new object,
      // which will be my new player's state, where I'll spread my old player's object into,
      // so that I start by again setting both the X and O property to the respective old player names.
      //But I will then overwrite one of these two properties. The property which I get here, with help of that symbol parameter.
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          {/* za da moze belezanoto da se menjava */}
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}{" "}
        {/*ako ima winner ili has a draw  e true povikaj gameover */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
