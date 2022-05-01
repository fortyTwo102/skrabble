import React, { useContext } from 'react'

import { AppContext } from '../App'
import './Scorecard.css'

function Scorecard() {
    const { activePlayer, tally, setTally } = useContext(AppContext)

    let playerOneScore = tally['playerOne']
    let playerTwoScore = tally['playerTwo']
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