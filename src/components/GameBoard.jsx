import { useState } from "react"

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]
export default function GameBoard({onSelectSquare,activePlayerSymbol}) {

    const [gameboard, setGameBoard] = useState(initialGameBoard)

    const handleSelectedGrid = (rowIndex, colIndex) => {
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol
            return updatedBoard
        })
        onSelectSquare()
    }
    return (
        <ol id="game-board">
            {gameboard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((symbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => handleSelectedGrid(rowIndex, colIndex)}>{symbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}