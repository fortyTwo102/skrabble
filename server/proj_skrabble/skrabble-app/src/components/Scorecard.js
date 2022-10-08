import React, { useContext } from 'react'

import { AppContext } from '../App'
import './Scorecard.css'

function Scorecard() {
    const { activePlayer, tally} = useContext(AppContext)

    let playerOneScore = tally['player-one']
    let playerTwoScore = tally['player-two']
    let isPlayerOneActive = activePlayer === "player-one" ? true : false
    let activeScoreStyleID = activePlayer + "-score-active"
    
    return (
        <div className='scorecard'>
            <p className='score-player-one' id={isPlayerOneActive && activeScoreStyleID}>{playerOneScore}</p>
            <p className='score-hyphen'> - </p>
            <p className='score-player-two' id={!isPlayerOneActive && activeScoreStyleID}>{playerTwoScore}</p>
        </div>
    )
}

export default Scorecard