import React, { useContext } from 'react'
import { AppContext } from '../App'

function Key({ keyVal, bigKey }) {
    const { board, setBoard, cursor } = useContext(AppContext)
    const selectLetter = () => {
        const newBoard = [...board]
        console.log(cursor)
        const row = cursor[0]
        const column = cursor[1]
        newBoard[row][column] = keyVal;
        setBoard(newBoard)
    }
    return (
        <div className='key' id={bigKey && "big"} onClick={selectLetter}>{keyVal}</div>
    )
}

export default Key