import React from 'react'
import './Scorecard.css'

function Scorecard() {
    let playerOneScore = 29
    let playerTwoScore = 56
    let isPlayerOneActive = true
    let activePlayer = "player-one"
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