import React from 'react'
import { ROW, COLUMN } from '../Words'
import Letter from './Letter'
import './Board.css'

function Board() {

    const boardItems = []

    // populate the board with letter spots
    for (let rindex = 0; rindex < ROW; rindex++){
        let letters = []
        for (let cindex = 0; cindex < COLUMN; cindex++){
            letters.push(<Letter row={rindex} column={cindex}/>)
        }
        let row_element = React.createElement("div", {key: rindex, className: "row"}, letters)
        boardItems.push(row_element)
    }

    return (
        <div className='board'>
            {boardItems}
        </div>
    );
}

export default Board;