import React, { useContext } from 'react'
import { AppContext } from '../App'

function Letter({row, column}) {
  const { board, setCursor, letterStyleBoard, setLetterStyleBoard, colorBoard } = useContext(AppContext)
  const letter = board[row][column]
  const keyColor = colorBoard[row][column]
  const letterStyleVal = letterStyleBoard[row][column]

  const moveCursor = () => {
      const newCursor = [row, column]
      let newLetterStyleBoard = [...letterStyleBoard]
      
      for (let rindex = 0; rindex < 6; rindex++) {
        for (let cindex = 0; cindex < 6; cindex++) {
          newLetterStyleBoard[rindex][cindex] = "letter"
        }
      }
      setLetterStyleBoard(newLetterStyleBoard)
      newLetterStyleBoard[row][column] = letterStyleVal === "letter" ? "letter-glow" : "letter"
      setCursor(newCursor)
      setLetterStyleBoard(newLetterStyleBoard)
      console.log(newLetterStyleBoard)
  }
  return (
    <div className={letterStyleVal} id={keyColor} onClick={moveCursor}>{letter}</div>
  )
}

export default Letter