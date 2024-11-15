import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./components/winnigComb"
import GameOver from "./components/gameOver"

const getActivePlayer = (gameTurns) => {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'

  }
  return currentPlayer
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
function App() {
  const [gameTurns, setGameTurns] = useState([])
  let gameboard = [...initialGameBoard.map(array => [...array])]
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameboard[row][col] = player
  }

  let winner
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol == secondSquareSymbol && firstSquareSymbol == thirdSquareSymbol) {
      winner = firstSquareSymbol
    }

  }

  const isDraw = gameTurns.length == 9 && !winner

  const activePlayer = getActivePlayer(gameTurns)

  const handleSelectSquare = (rowI, colI) => {

    setGameTurns((prevTurns) => {
      const currentPlayer = getActivePlayer(prevTurns)

      const updatedTurns = [
        { square: { row: rowI, col: colI }, player: currentPlayer },
        ...prevTurns,
      ]
      return updatedTurns
    })

  }
  const handleRestart = () => {
    setGameTurns([])
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName='Player 1' symbol='X' isActive={activePlayer == 'X'} />
          <Player initialName='Player 2' symbol='O' isActive={activePlayer == 'O'} />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameboard} />
      </div>
      <Log selectedGrids={gameTurns} />
    </main>
  )
}

export default App
