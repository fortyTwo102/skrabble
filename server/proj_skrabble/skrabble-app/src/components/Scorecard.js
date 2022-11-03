import Computer from "@mui/icons-material/Computer";
import Person from "@mui/icons-material/Person";
import React, { useContext } from "react";

import { AppContext } from "../App";
import "./Scorecard.css";

function Scorecard() {
  const {
    activePlayer,
    tally
  } = useContext(AppContext);

  let playerOneScore = tally["player-one"];
  let playerTwoScore = tally["player-two"];
  let isPlayerOneActive = activePlayer === "player-one" ? true : false;
  let activeScoreStyleID = activePlayer + "-score-active";

  return (
    <div className="scorecard">
      <Person sx={{ top: 7, position: "relative" }} />
      <p
        className="score-player-one"
        id={isPlayerOneActive && activeScoreStyleID}
      >
        {playerOneScore}
      </p>
      <p className="score-hyphen"> - </p>
      <p
        className="score-player-two"
        id={!isPlayerOneActive && activeScoreStyleID}
      >
        {playerTwoScore}
      </p>
      {window.location.pathname.startsWith("/ai/") ? (
        <Computer sx={{ right: -1.5, top: 7, position: "relative" }} />
      ) : (
        <Person sx={{ right: -1.5, top: 7, position: "relative" }} />
      )}
    </div>
  );
}

export default Scorecard;
