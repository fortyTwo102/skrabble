import React, { useContext } from 'react'

import { AppContext } from '../App'
import { ROW, COLUMN } from '../Initializer'
import './Letter.css'

function Letter({row, column}) {
  
  const { board, setBoard, setCursor, activePlayer, playerRole, turnInProgress, setTurnInProgress, chatSocket } = useContext(AppContext)

  const keyColor = board[row][column]["player"]
  const letterStyleVal = board[row][column]["cursor"] ? "letter-glow" : "letter"
  const letter = board[row][column]["keyVal"]

  const moveCursor = () => {

    if ((activePlayer == "player-one" && playerRole == "player_one") || (activePlayer == "player-two" && playerRole == "player_two")) {
        console.log("TIP " + turnInProgress)
        
        if (turnInProgress) {
          console.log("TIP. Not allowed.")
          return
        }
        
        const newCursor = [row, column]
        let newBoard = [...board]
        
        // remove the glow cursor from other place(s)
        for (let rindex = 0; rindex < ROW; rindex++) {
          for (let cindex = 0; cindex < COLUMN; cindex++) {
            newBoard[rindex][cindex]["cursor"] = false
          }
        }
        setBoard(newBoard)
        chatSocket.send(JSON.stringify({
            "board": newBoard,
        }))

        // glow it up
        newBoard[row][column]["cursor"] = true
        
        setBoard(newBoard)
        setCursor(newCursor)

        chatSocket.send(JSON.stringify({
            "board": newBoard,
            "cursor": newCursor
        }))

        console.log(newBoard[row][column])
      }else{
        
        console.log("Uh oh, you can't play right now.")
        console.log(activePlayer)
        console.log(playerRole)

      }
  }
  return (
    <div className={letterStyleVal} id={keyColor} onClick={moveCursor}>{letter}</div>
  )
}

export default Letter