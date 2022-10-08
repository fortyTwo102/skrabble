import React, { useContext } from 'react'

import { AppContext } from '../App'
import './GameInfo.css'

function GameInfo() {
    const { activePlayer, playerRole } = useContext(AppContext)

    let playerRoleLabel = ""
    let playerRoleStyleID = ""
    let turnString = ""

    // set approapriate player role info on top
    if (playerRole == "player_one") {

       playerRoleLabel = "Player Blue"
       playerRoleStyleID = "player-one-active"

    }else if (playerRole == "player_two") {

       playerRoleLabel = "Player Orange"
       playerRoleStyleID = "player-two-active"

    }else if (playerRole.startsWith("observer")) {

       playerRoleLabel = "Observer"
       playerRoleStyleID = "observer-active"

    }

    // set approapriate turn info on top

    if (playerRole.startsWith("observer"))
    {
        turnString = "You can just watch."
    }else{
        if (activePlayer == "player-one" && playerRole == "player_one"){
            turnString = "It is your turn."
        }else if (activePlayer == "player-two" && playerRole == "player_two"){
            turnString = "It is your turn."
        }else if (activePlayer == "player-one" && playerRole == "player_two"){
            turnString = "Please wait, while \"Blue\" plays their turn."
        }else if (activePlayer == "player-two" && playerRole == "player_one"){
            turnString = "Please wait, while \"Orange\" plays their turn."
        }
    }


    return (
        <div className='gameinfo'>
            <p className='generic-string1' >You joined as: </p>
            <p className='player-role' id={playerRoleStyleID}>{playerRoleLabel}</p>
            <br/>
            <p className='turn-string' >{turnString}</p>
        </div>
    )
}

export default GameInfo