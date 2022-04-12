import React, { useContext } from 'react'

import { AppContext } from '../App'
import './Scorecard.css'

function Scorecard() {
    const { activePlayer, setActivePlayer} = useContext(AppContext)

    let playerOneScore = 29
    let playerTwoScore = 56
    let isPlayerOneActive = activePlayer === "player-one" ? true : false
    let activeScoreStyleID = activePlayer + "-active"
    
    return (
        <div className='scorecard'>
            <p className='score-player-one' id={isPlayerOneActive && activeScoreStyleID}>{playerOneScore}</p>
            <p className='score-hyphen'> - </p>
            <p className='score-player-two' id={!isPlayerOneActive && activeScoreStyleID}>{playerTwoScore}</p>
        </div>
    )
}

export default Scorecard