import React, { useContext } from 'react'
import { AppContext } from '../App'

function Letter({row, column}) {
  const { board, setCursor } = useContext(AppContext)
  const letter = board[row][column]
  const moveCursor = () => {
      const newCursor = [row, column]
      setCursor(newCursor)
  }
  return (
    <div className="letter" onClick={moveCursor}>{letter}</div>
  )
}

export default Letter