import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';

import { AppContext } from '../App'
import { ROW, COLUMN } from '../Initializer'
import { getWordsEndingOnCursor } from '../utils/gameLogic'
import './Key.css'

import { useAlert } from 'react-alert'
import { transitions, positions, types, Provider as AlertProvider } from 'react-alert'

import Button from '@mui/material/Button';  

function Key({ keyVal, bigKey }) {
    const { board, setBoard, cursor, activePlayer, playerRole, setActivePlayer, tally, setTally, wordsMade, setWordsMade, letterCounter, SetLetterCounter, turnInProgress, setTurnInProgress, chatSocket} = useContext(AppContext)
    const alert = useAlert()

    const playAgain = async () => {
        window.location.replace("../")
    }

    const inputLetter = async () => {
    
        const newBoard = [...board]
        const row = cursor[0]
        const column = cursor[1]

        if ((activePlayer == "player-one" && playerRole == "player_one") || (activePlayer == "player-two" && playerRole == "player_two")) {

            if (keyVal !== "Enter" && keyVal !== "Delete" && newBoard[row][column]['alive']){

                // assign letter 

                newBoard[row][column]['keyVal'] = keyVal
                setBoard(newBoard)
                chatSocket.send(JSON.stringify({
                    "board": newBoard,
                }))
                
                if (setTurnInProgress) {
                    setTurnInProgress(true)
                    chatSocket.send(JSON.stringify({
                        "turnInProgress": true,
                    }))
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
                wordsMade.push(...newWordsMade)

                // console.log("KEY TWM")
                // console.log(tempWordsMade)
                // console.log("wordsMade:")

                setWordsMade(wordsMade)
                // console.log(wordsMade)
                chatSocket.send(JSON.stringify({
                    "wordsMade": wordsMade,
                }))


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
                chatSocket.send(JSON.stringify({
                    "board": newBoard,
                }))

                if (setTurnInProgress) {
                    setTurnInProgress(false)
                    chatSocket.send(JSON.stringify({
                        "turnInProgress": false,
                    }))
                }


                // 3. set score

                newWordsMade.forEach(newWordMade => {
                    let newWordMadeObj = JSON.parse(newWordMade)
                    tally[activePlayer] += newWordMadeObj["word"].length
                    setTally(tally)
                    chatSocket.send(JSON.stringify({
                        "tally": tally,
                    }))

                    // popup alert
                    alert.success(`+${newWordMadeObj["word"].length} for ${newWordMadeObj["word"]}`, {
                        timeout: 1500
                    })
                })

                // 4. Set GameBoard letter counter
                SetLetterCounter(letterCounter + 1)
                console.log("LC:")
                console.log(letterCounter + 1)
                chatSocket.send(JSON.stringify({
                    "letterCounter": letterCounter + 1,
                }))

                // 5. ENDGAME 

                if (letterCounter + 1 == 3) {

                    let endgameLabel = ""
                    if ((tally["player-one"] > tally["player-two"]) && (activePlayer == "player-one")){
                        endgameLabel = "winner!"
                    } else if ((tally["player-one"] < tally["player-two"]) && (activePlayer == "player-one")){
                        endgameLabel = "Sorry, you lost"
                    } else if ((tally["player-one"] > tally["player-two"]) && (activePlayer == "player-two")){
                        endgameLabel = "Sorry, you lost :("
                    } else if ((tally["player-one"] < tally["player-two"]) && (activePlayer == "player-two")){
                        endgameLabel = "Congrats, you won!"
                    } else if (tally["player-one"] == tally["player-two"]){
                        endgameLabel = "Game drawn!"
                    } 

                    endgameLabel = "                   "
                    
                    alert.info(<p>{endgameLabel}
                        <Button variant="contained" color="success" size="small" onClick={playAgain}>New Game
                        </Button></p>, {
                        timeout: 0,
                        offset: '100px',
                        containerStyle: {
                            fontSize: 10
                        }
                    })
                }
                
                // 6. set appropriate player
                if(activePlayer === "player-one"){
                    setActivePlayer("player-two")
                    chatSocket.send(JSON.stringify({
                        "activePlayer": "player-two",
                    }))
                } else {
                    setActivePlayer("player-one")
                    chatSocket.send(JSON.stringify({
                        "activePlayer": "player-one",
                    }))
                }

            } else if (keyVal === 'Delete' && newBoard[row][column]['alive']) {

                newBoard[row][column]['keyVal'] = ''

                setBoard(newBoard)
                chatSocket.send(JSON.stringify({
                    "board": newBoard,
                }))
                
                if (setTurnInProgress) {
                    setTurnInProgress(false)
                    chatSocket.send(JSON.stringify({
                        "turnInProgress": false,
                    }))
                }
                
                
            } else {
                console.log("Unforeseen circumstances.")
            }
        } else {
            alert.show("Not allowed", {
                timeout: 2000,
                type: types.ERROR,
            })
        }
    }
    return (
        <div className='key' id={bigKey && "big"} onClick={inputLetter}>{keyVal}</div>
    )
}

export default Key