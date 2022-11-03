import React, { useContext } from "react";
import { useAlert } from "react-alert";
import { types, Provider as AlertProvider } from "react-alert";

import { AppContext } from "../App";
import { ROW, COLUMN } from "../Initializer";
import "./Letter.css";

function Letter({ row, column }) {
  const {
    board,
    setBoard,
    setCursor,
    activePlayer,
    playerRole,
    turnInProgress,
    chatSocket,
  } = useContext(AppContext);
  const alert = useAlert();

  const keyColor = board[row][column]["player"];
  const letterStyleVal = board[row][column]["cursor"]
    ? "letter-glow"
    : "letter";
  const letter = board[row][column]["keyVal"];

  const moveCursor = () => {
    if (
      (activePlayer === "player-one" && playerRole === "player_one") ||
      (activePlayer === "player-two" && playerRole === "player_two") ||
      (activePlayer === "player-two" &&
        window.location.pathname.startsWith("/ai/"))
    ) {
      // console.log("TIP " + turnInProgress)

      if (turnInProgress) {
        console.log("TIP. Not allowed.");
        return;
      }

      const newCursor = [row, column];
      let newBoard = [...board];

      // remove the glow cursor from other place(s)
      for (let rindex = 0; rindex < ROW; rindex++) {
        for (let cindex = 0; cindex < COLUMN; cindex++) {
          newBoard[rindex][cindex]["cursor"] = false;
        }
      }
      setBoard(newBoard);
      chatSocket.send(
        JSON.stringify({
          board: newBoard,
        })
      );

      // glow it up
      newBoard[row][column]["cursor"] = true;

      setBoard(newBoard);
      setCursor(newCursor);

      chatSocket.send(
        JSON.stringify({
          board: newBoard,
          cursor: newCursor,
        })
      );

      console.log(newBoard[row][column]);

      // if (activePlayer === "player-two" && playerRole === "player_two"){
      //   var xpath = "//div[@class='key' and text()='A']";
      //   var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      //   matchingElement.click()
      // }

      console.log(newBoard[row][column]);
    } else {
      console.log("Cursor not allowed");
      alert.show("Not allowed", {
        timeout: 2000,
        type: types.ERROR,
      });
    }
  };
  return (
    <div className={letterStyleVal} id={keyColor} onClick={moveCursor}>
      {letter}
    </div>
  );
}

export default Letter;
