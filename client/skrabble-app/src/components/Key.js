import React, { useContext } from 'react'

import { AppContext } from '../App'
import { ROW, COLUMN } from '../Initializer'
import { getWordsEndingOnCursor } from '../utils/gameLogic'
import './Key.css'

function Key({ keyVal, bigKey }) {
    const { board, setBoard, cursor, activePlayer, setActivePlayer, tally, setTally, letterCombs, setLetterCombs} = useContext(AppContext)
    const inputLetter = () => {
        
        
        const newBoard = [...board]
        const row = cursor[0]
        const column = cursor[1]

        if (newBoard[row][column]['alive']){
            
            // assign letter 
            newBoard[row][column]['keyVal'] = keyVal
            newBoard[row][column]["player"] = activePlayer // takes care of coloring
            newBoard[row][column]['alive'] = false

            setBoard(newBoard)

            // remove glow after keyVal is set
            
            for (let rindex = 0; rindex < ROW; rindex++) {
                for (let cindex = 0; cindex < COLUMN; cindex++) {
                newBoard[rindex][cindex]["cursor"] = false
                }
            }

            setBoard(newBoard)

            // -------------------- GAME LOGIC --------------------
            // 1. find if any words have been made
            let wordsEndingOnCursor = getWordsEndingOnCursor(cursor, newBoard)
            let newWordSet = new Set([...wordsEndingOnCursor, ...letterCombs])
            setLetterCombs(newWordSet)
            console.log(newWordSet)
            // 2. color them if words have been made

            // 3. set score
            
            // set appropriate player

            activePlayer === "player-one" ? setActivePlayer("player-two") : setActivePlayer("player-one")
        }else{

            console.log("Board position already has value.")

        }
    }
    return (
        <div className='key' id={bigKey && "big"} onClick={inputLetter}>{keyVal}</div>
    )
}

export default Key