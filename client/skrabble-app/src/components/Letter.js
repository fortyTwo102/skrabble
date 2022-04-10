import React, { useContext } from 'react'
import { AppContext } from '../App'

function Letter({row, column}) {
  const { board } = useContext(AppContext)
  const letter = board[row][column]
  return (
    <div className="letter" >{letter}</div>
  )
}

export default Letter