import React, { useContext } from 'react'
import { AppContext } from '../App'

import { ROW, COLUMN } from '../Words'

function Letter({row, column}) {
  const { board, setCursor, letterStyleBoard, setLetterStyleBoard, colorBoard } = useContext(AppContext)
  
  const keyColor = colorBoard[row][column]
  const letterStyleVal = letterStyleBoard[row][column]
  const letter = board[row][column]

  const moveCursor = () => {

      if (letter !== ''){
        return
      }

      const newCursor = [row, column]
      let newLetterStyleBoard = [...letterStyleBoard]
      
      for (let rindex = 0; rindex < ROW; rindex++) {
        for (let cindex = 0; cindex < COLUMN; cindex++) {
          newLetterStyleBoard[rindex][cindex] = "letter"
        }
      }

      setLetterStyleBoard(newLetterStyleBoard)
      newLetterStyleBoard[row][column] = "letter-glow"
      setCursor(newCursor)
      setLetterStyleBoard(newLetterStyleBoard)
      console.log(newLetterStyleBoard)
  }
  return (
    <div className={letterStyleVal} id={keyColor} onClick={moveCursor}>{letter}</div>
  )
}

export default Letter