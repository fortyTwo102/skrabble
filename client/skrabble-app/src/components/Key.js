import React, { useContext } from 'react'

import { AppContext } from '../App'
import { ROW, COLUMN } from '../Words'
import './Key.css'

function Key({ keyVal, bigKey }) {
    const { board, setBoard, cursor, colorBoard, setColorBoard, activePlayer, setActivePlayer, letterStyleBoard, setLetterStyleBoard } = useContext(AppContext)
    const inputLetter = () => {
        
        // assign letter 
        const newBoard = [...board]
        const row = cursor[0]
        const column = cursor[1]
        newBoard[row][column] = keyVal;
        setBoard(newBoard)
        
        // take care of proper coloring
        const newColorBoard = [...colorBoard]
        newColorBoard[row][column] = activePlayer
        setColorBoard(newColorBoard)

        // remove glow after keyVal is set
        let newLetterStyleBoard = [...letterStyleBoard]
        
        for (let rindex = 0; rindex < ROW; rindex++) {
            for (let cindex = 0; cindex < COLUMN; cindex++) {
            newLetterStyleBoard[rindex][cindex] = "letter"
            }
        }

        setLetterStyleBoard(newLetterStyleBoard)

        // set appropriate player
        activePlayer === "player-one" ? setActivePlayer("player-two") : setActivePlayer("player-one")
    }
    return (
        
        <div className='key' id={bigKey && "big"} onClick={inputLetter}>{keyVal}</div>
    )
}

export default Key