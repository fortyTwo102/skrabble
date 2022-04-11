import React, { useState } from 'react'
import { boardDefault, ROW, COLUMN } from '../Words';
import Letter from './Letter';

function Board() {

    const boardItems = []

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