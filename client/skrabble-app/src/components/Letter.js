import React, { useContext } from 'react'

import { AppContext } from '../App'
import { ROW, COLUMN } from '../Initializer'
import './Letter.css'

function Letter({row, column}) {
  const { board, setBoard, setCursor } = useContext(AppContext)
  
  const keyColor = board[row][column]["player"]
  const letterStyleVal = board[row][column]["cursor"] ? "letter-glow" : "letter"
  const letter = board[row][column]["keyVal"]

  const moveCursor = () => {

      // if there is already a letter in the board spot
      if (letter !== ''){
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

      // glow it up
      newBoard[row][column]["cursor"] = true
      
      setBoard(newBoard)
      setCursor(newCursor)
      console.log(newBoard[row][column])
  }
  return (
    <div className={letterStyleVal} id={keyColor} onClick={moveCursor}>{letter}</div>
  )
}

export default Letter