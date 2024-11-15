import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { useState } from "react"

const getActivePlayer = (gameTurns) => {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'

  }
  return currentPlayer
}
function App() {

  const [gameTurns, setGameTurns] = useState([])

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
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName='Player 1' symbol='X' isActive={activePlayer == 'X'} />
          <Player initialName='Player 2' symbol='O' isActive={activePlayer == 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log selectedGrids={gameTurns} />
    </main>
  )
}

export default App
