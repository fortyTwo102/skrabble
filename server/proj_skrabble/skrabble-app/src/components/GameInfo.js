import React, { useContext } from "react";

import { AppContext } from "../App";
import "./GameInfo.css";

function GameInfo() {
  const {
    activePlayer,
    playerRole,
    playerOneName,
    setPlayerOneName,
    playerTwoName,
    setPlayerTwoName,
  } = useContext(AppContext);

  let playerRoleLabel = "";
  let playerRoleStyleID = "";
  let turnString = "";

  // set approapriate player role info on top
  // if (playerRole === "player_one") {
  //   playerRoleLabel = "Player Blue";
  //   playerRoleStyleID = "player-one-active";
  // } else if (playerRole === "player_two") {
  //   playerRoleLabel = "Player Orange";
  //   playerRoleStyleID = "player-two-active";
  // } else if (playerRole.startsWith("observer")) {
  //   playerRoleLabel = "Observer";
  //   playerRoleStyleID = "observer-active";
  // }

  // set approapriate turn info on top

  if (playerRole.startsWith("observer")) {
    turnString = "You can just watch";
  } else {
    if (activePlayer === "player-one" && playerRole === "player_one") {
      turnString = "It is your turn";
    } else if (activePlayer === "player-two" && playerRole === "player_two") {
      turnString = "It is your turn";
    } else if (activePlayer === "player-one" && playerRole === "player_two") {
      turnString = "Please wait, while " + playerOneName + " plays their turn";
    } else if (
      activePlayer === "player-two" &&
      playerRole === "player_one" &&
      window.location.pathname.startsWith("/core/")
    ) {
      turnString = "Please wait, while " + playerTwoName + " plays their turn";
    } else if (
      activePlayer === "player-two" &&
      window.location.pathname.startsWith("/ai/")
    ) {
      turnString = "Please wait, while the AI plays its turn";
    } else {
      console.error(activePlayer + " x " + playerRole);
    }
  }

  return (
    <div className="gameinfo">
      <p className="player-one" id="player-one-active">
        {playerOneName}
      </p>
      <p className="versus"> has challenged </p>
      <p className="player-two" id="player-two-active">
        {playerTwoName}
      </p>
      <br />
      <p className="turn-string">{turnString}</p>
    </div>
  );
}

export default GameInfo;
