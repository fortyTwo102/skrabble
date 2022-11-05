import React, { useContext } from "react";
import { types, Provider as AlertProvider } from "react-alert";

import { AppContext } from "../App";
import { ROW, COLUMN } from "../Initializer";
import { getWordsEndingOnCursor } from "../utils/gameLogic";
import "./Key.css";

import { useAlert } from "react-alert";

function Key({ keyVal, bigKey }) {
  const {
    board,
    setBoard,
    cursor,
    activePlayer,
    playerRole,
    setActivePlayer,
    tally,
    setTally,
    wordsMade,
    setWordsMade,
    letterCounter,
    SetLetterCounter,
    setTurnInProgress,
    chatSocket,
  } = useContext(AppContext);
  const alert = useAlert();

  function isWordTaken(word) {
    let isWordTakenFlag = false;

    // console.log("word: " + word)
    // console.log("wordsMade: ")
    // console.log(wordsMade)
    // console.log(wordsMade.length)

    wordsMade.forEach((wordMade) => {
      let wordMadeJSON = JSON.parse(wordMade);
      if (wordMadeJSON["word"] === word) {
        console.log("Word: " + word + " is already taken.");
        isWordTakenFlag = true;
      }
    });
    return isWordTakenFlag;
  }

  const inputLetter = async () => {
    const newBoard = [...board];
    const row = cursor[0];
    const column = cursor[1];

    console.log("KeyVAl:" + keyVal);
    console.log(newBoard[row][column]);

    if (
      (activePlayer === "player-one" && playerRole === "player_one") ||
      (activePlayer === "player-two" && playerRole === "player_two") ||
      (activePlayer === "player-two" &&
        window.location.pathname.startsWith("/ai/"))
    ) {
      if (
        keyVal !== "Enter" &&
        keyVal !== "Delete" &&
        newBoard[row][column]["alive"]
      ) {
        // assign letter

        newBoard[row][column]["keyVal"] = keyVal;
        setBoard(newBoard);
        chatSocket.send(
          JSON.stringify({
            board: newBoard,
          })
        );

        if (setTurnInProgress) {
          setTurnInProgress(true);
          chatSocket.send(
            JSON.stringify({
              turnInProgress: true,
            })
          );
        }
        console.log(newBoard[row][column]);
      } else if (
        keyVal === "Enter" &&
        newBoard[row][column]["alive"] &&
        newBoard[row][column]["keyVal"] !== ""
      ) {
        // remove glow after keyVal is set

        // console.log("KEYVAL: " + keyVal + " of len: " + keyVal.length);

        for (let rindex = 0; rindex < ROW; rindex++) {
          for (let cindex = 0; cindex < COLUMN; cindex++) {
            board[rindex][cindex]["cursor"] = false;
          }
        }

        // -------------------- GAME LOGIC --------------------
        // 1. find if any words have been made

        let newWordsMade = await getWordsEndingOnCursor(
          cursor,
          newBoard,
          wordsMade,
          activePlayer
        );

        // double check word taken or not

        // console.log("NWM1");
        // console.log(newWordsMade);

        var temp = new Set();
        newWordsMade.forEach((newWordMade) => {
          let newWordMadeObj = JSON.parse(newWordMade);
          if (!isWordTaken(newWordMadeObj["word"])) {
            temp.add(JSON.stringify(newWordMadeObj));
          }
        });

        newWordsMade = temp;

        // console.log("NWM2");
        // console.log(newWordsMade);

        // // console.log("KEY NWM")
        wordsMade.push(...newWordsMade);

        // // console.log("KEY TWM")
        // // console.log(tempWordsMade)
        // // console.log("wordsMade:")

        setWordsMade(wordsMade);
        // console.log(wordsMade)

        chatSocket.send(
          JSON.stringify({
            wordsMade: wordsMade,
          })
        );

        // 2. color them in the color of the appropriate player

        newWordsMade.forEach((newWordMade) => {
          let newWordMadeObj = JSON.parse(newWordMade);

          // // console.log(newWordMadeObj)
          // find if the last move had any words made

          let anyWordsMade = false;
          newWordMadeObj["location"].forEach((loc) => {
            if (loc[0] === cursor[0] && loc[1] === cursor[1]) {
              anyWordsMade = true;
            }
          });
          // color
          newWordMadeObj["location"].forEach((loc) => {
            if (anyWordsMade) {
              newBoard[loc[0]][loc[1]]["player"] = activePlayer;
              newBoard[loc[0]][loc[1]]["partOfWord"] = true;
            }
          });
        });

        newBoard[row][column]["alive"] = false;
        setBoard(newBoard);
        // console.log(board);
        // console.log(newBoard);
        chatSocket.send(
          JSON.stringify({
            board: newBoard,
          })
        );

        if (setTurnInProgress) {
          setTurnInProgress(false);
          chatSocket.send(
            JSON.stringify({
              turnInProgress: false,
            })
          );
        }

        // 3. set score

        newWordsMade.forEach((newWordMade) => {
          let newWordMadeObj = JSON.parse(newWordMade);
          tally[activePlayer] += newWordMadeObj["word"].length;
          setTally(tally);
          chatSocket.send(
            JSON.stringify({
              tally: tally,
            })
          );

          // popup alert
          // alert.success(
          //   `+${newWordMadeObj["word"].length} for ${newWordMadeObj["word"]}`,
          //   {
          //     timeout: 1500,
          //   }
          // );

          if (
            window.location.pathname.startsWith("/core/") ||
            (window.location.pathname.startsWith("/ai/") &&
              activePlayer === "player-one")
          ) {
            alert.show(
              <div>
                +{newWordMadeObj["word"].length} for{" "}
                <a
                  href={"https://scrabblecheck.com/" + newWordMadeObj["word"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#7EC8E3" }}
                >
                  {newWordMadeObj["word"]}
                </a>
              </div>,
              {
                timeout: 1500,
                type: types.SUCCESS,
              }
            );
          }
        });

        // 4. Set GameBoard letter counter
        SetLetterCounter(letterCounter + 1);

        console.log("LC:");
        console.log(letterCounter + 1);

        chatSocket.send(
          JSON.stringify({
            letterCounter: letterCounter + 1,
          })
        );

        // 5. check if all the boxes are filled
        if (letterCounter + 1 == 5) {
          console.log("ENDGAME SENDING BECAUSE: " + letterCounter);
          // console.log(tally);

          chatSocket.send(
            JSON.stringify({
              endGameTally: tally,
            })
          );
        }

        // because of AI

        let moddedActivePlayer = {
          activePlayer: "",
          board: newBoard,
          wordsMade: wordsMade,
        };

        // 6. set appropriate player
        if (activePlayer === "player-one") {
          moddedActivePlayer["activePlayer"] = "player-two";
          setActivePlayer(moddedActivePlayer["activePlayer"]);
          chatSocket.send(
            JSON.stringify({
              activePlayer: moddedActivePlayer,
            })
          );
        } else {
          moddedActivePlayer["activePlayer"] = "player-one";
          setActivePlayer(moddedActivePlayer["activePlayer"]);
          chatSocket.send(
            JSON.stringify({
              activePlayer: moddedActivePlayer,
            })
          );
        }

        return;
      } else if (keyVal === "Delete" && newBoard[row][column]["alive"]) {
        newBoard[row][column]["keyVal"] = "";

        setBoard(newBoard);
        chatSocket.send(
          JSON.stringify({
            board: newBoard,
          })
        );

        if (setTurnInProgress) {
          setTurnInProgress(false);
          chatSocket.send(
            JSON.stringify({
              turnInProgress: false,
            })
          );
        }
      } else if (
        keyVal === "Enter" &&
        newBoard[row][column]["alive"] &&
        newBoard[row][column]["keyVal"] === ""
      ) {
        alert.show("Empty Input", {
          timeout: 2000,
          type: types.ERROR,
        });
      } else {
        console.log(keyVal);
        console.log(newBoard[row][column]);
        console.log(playerRole + " x " + activePlayer);
        console.log("Unforeseen circumstances.");
      }
    } else {
      console.log("Key not allowed");
      alert.show("Not allowed", {
        timeout: 2000,
        type: types.ERROR,
      });
    }
    return;
  };
  return (
    <div className="key" id={bigKey && "big"} onClick={inputLetter}>
      {keyVal}
    </div>
  );
}

export default Key;
