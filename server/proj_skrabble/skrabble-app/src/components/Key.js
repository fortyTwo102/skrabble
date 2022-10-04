import React, { useContext } from 'react'

import { AppContext } from '../App'
import { ROW, COLUMN } from '../Initializer'
import { getWordsEndingOnCursor } from '../utils/gameLogic'
import './Key.css'

function Key({ keyVal, bigKey }) {
    const { board, setBoard, cursor, activePlayer, setActivePlayer, tally, setTally, wordsMade, setWordsMade, turnInProgress, setTurnInProgress, chatSocket} = useContext(AppContext)
    const inputLetter = async () => {
    
        const newBoard = [...board]
        const row = cursor[0]
        const column = cursor[1]

        if (keyVal !== "Enter" && keyVal !== "Delete" && newBoard[row][column]['alive']){

            // assign letter 

            newBoard[row][column]['keyVal'] = keyVal
            setBoard(newBoard)
            
            if (setTurnInProgress) {
                setTurnInProgress(true)
            }

        
        } else if (keyVal === "Enter" && newBoard[row][column]['alive']) {
            
        // remove glow after keyVal is set
        
        for (let rindex = 0; rindex < ROW; rindex++) {
            for (let cindex = 0; cindex < COLUMN; cindex++) {
            board[rindex][cindex]["cursor"] = false
            }
        }


        // -------------------- GAME LOGIC --------------------
        // 1. find if any words have been made
        
        let newWordsMade = await getWordsEndingOnCursor(cursor, newBoard, wordsMade)
        // console.log("KEY NWM")
        let tempWordsMade = new Set([...wordsMade, ...newWordsMade])

        // console.log("KEY TWM")
        // console.log(tempWordsMade)

        setWordsMade(tempWordsMade)

        // 2. color them in the color of the appropriate player
        
        newWordsMade.forEach(newWordMade => {
            let newWordMadeObj = JSON.parse(newWordMade)

            // console.log(newWordMadeObj)
            // find if the last move had any words made
            
            let anyWordsMade = false
            newWordMadeObj["location"].forEach(loc => {
                if (loc[0] === cursor[0] && loc[1] === cursor[1]){
                    anyWordsMade = true
                }
            })
            // color 
            newWordMadeObj["location"].forEach(loc => {
                if (anyWordsMade){
                    newBoard[loc[0]][loc[1]]["player"] = activePlayer
                    newBoard[loc[0]][loc[1]]["partOfWord"] = true
                }
            })
        })
        
        newBoard[row][column]['alive'] = false
        setBoard(newBoard)

        if (setTurnInProgress) {
            setTurnInProgress(false)
        }


        // 3. set score

        newWordsMade.forEach(newWordMade => {
            let newWordMadeObj = JSON.parse(newWordMade)
            tally[activePlayer] += newWordMadeObj["word"].length
            setTally(tally)
        })

        console.log(tally)
        
        // 4. set appropriate player
        activePlayer === "player-one" ? setActivePlayer("player-two") : setActivePlayer("player-one")


        } else if (keyVal === 'Delete' && newBoard[row][column]['alive']) {

            newBoard[row][column]['keyVal'] = ''
            setBoard(newBoard)
            
            if (setTurnInProgress) {
                setTurnInProgress(false)
            }
        } else {
            console.log("Unforeseen circumstances.")
        }

        // 5. send game data to other player

        // console.log("[STARTDEBUG]: chatSocket at Key.js")
        // console.log(chatSocket)
        // console.log("[ENDDEBUG]: chatSocket at Key.js")

        chatSocket.send(JSON.stringify({
            "board": newBoard,
            "tally": tally,
        }))
        
    }
    return (
        <div className='key' id={bigKey && "big"} onClick={inputLetter}>{keyVal}</div>
    )
}

export default Key