import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { useState } from "react"

function App() {
  const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurns, setGameTurns] = useState([])

  const handleSelectSquare = (rowI, colI) => {
    setActivePlayer((curActive) => (curActive === 'X' ? 'O' : 'X'))

    setGameTurns((prevTurns) => {
      let currentPlayer = 'X'
      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O'
      }
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
      <Log selectedGrids={gameTurns}/>
    </main>
  )
}

export default App
