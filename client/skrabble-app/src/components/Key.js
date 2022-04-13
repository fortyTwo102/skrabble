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
        newBoard[row][column]['keyVal'] = keyVal
        newBoard[row][column]["player"] = activePlayer // takes care of coloring
        setBoard(newBoard)

        // remove glow after keyVal is set
        
        for (let rindex = 0; rindex < ROW; rindex++) {
            for (let cindex = 0; cindex < COLUMN; cindex++) {
            newBoard[rindex][cindex]["cursor"] = false
            }
        }

        setBoard(newBoard)
        
        // set appropriate player
        activePlayer === "player-one" ? setActivePlayer("player-two") : setActivePlayer("player-one")
    }
    return (
        <div className='key' id={bigKey && "big"} onClick={inputLetter}>{keyVal}</div>
    )
}

export default Key