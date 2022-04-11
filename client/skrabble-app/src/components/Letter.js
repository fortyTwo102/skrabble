import React, { useContext } from 'react'
import { AppContext } from '../App'

import { ROW, COLUMN } from '../Words'

function Letter({row, column}) {
  const { board, setCursor, letterStyleBoard, setLetterStyleBoard, colorBoard } = useContext(AppContext)
  
  const keyColor = colorBoard[row][column]
  const letterStyleVal = letterStyleBoard[row][column]
  const letter = board[row][column]

  const moveCursor = () => {

      // if there is already a letter in the board spot
      if (letter !== ''){
        return
      }

      
      const newCursor = [row, column]
      let newLetterStyleBoard = [...letterStyleBoard]
      
      // remove the glow cursor from other place(s)
      for (let rindex = 0; rindex < ROW; rindex++) {
        for (let cindex = 0; cindex < COLUMN; cindex++) {
          newLetterStyleBoard[rindex][cindex] = "letter"
        }
      }
      setLetterStyleBoard(newLetterStyleBoard)

      // glow it up
      newLetterStyleBoard[row][column] = "letter-glow"
      setLetterStyleBoard(newLetterStyleBoard)
      
      setCursor(newCursor)
  }
  return (
    <div className={letterStyleVal} id={keyColor} onClick={moveCursor}>{letter}</div>
  )
}

export default Letter