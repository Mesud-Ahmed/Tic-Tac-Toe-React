import { useState } from "react"
export default function Player({ initialName, symbol,isActive,onSaving }) {
    const [playerName,setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)
    const handleClick = () => {
        setIsEditing((edting) => !edting)
        if(isEditing){
            onSaving(symbol,playerName)
        }
        
    }
    const handleChange = (e) =>{
        
        setPlayerName(e.target.value)
    }
    let editedName = <span className="player-name">{playerName}</span>
    if(isEditing){
        editedName = <input type="text" required Value={playerName} onChange={handleChange}></input>
    }
    return (

        <li className={isActive && 'active'}>
            <span className="player">
               {editedName}
                <span className="player-symbol">{symbol}</span>
            </span>
            
            <button onClick={handleClick}>{isEditing ? 'Save': 'Edit'}</button>
        </li>
    )
}