// general
import { useEffect, useRef } from "react";
import { useAlert } from "react-alert";
import { types, Provider as AlertProvider } from "react-alert";
import { createContext, useState } from "react";

// style
import "./App.css";

// components
import Keyboard from "./components/Keyboard";
import Board from "./components/Board";
import Scorecard from "./components/Scorecard";
import GameInfo from "./components/GameInfo";
import Button from "@mui/material/Button";
import NavBar from "./components/NavBar";

// utils
import {
  colorBoardDefault,
  letterStyleBoardDefault,
  mainBoardDefault,
  tallyDefault,
} from "./Initializer";
import { wordList } from "./Words";
import { getLetterToPlay } from "./utils/aiLogic.js";
import listToMatrix from "./utils/utils.js";

export const AppContext = createContext();

function App() {
  // State Management
  const [board, setBoard] = useState(mainBoardDefault);
  const [letterCombs, setLetterCombs] = useState(new Set());
  const [wordsMade, setWordsMade] = useState([]);
  const [cursor, setCursor] = useState([0, 0]);
  const [tally, setTally] = useState(tallyDefault);
  const [colorBoard, setColorBoard] = useState(colorBoardDefault);
  const [activePlayer, setActivePlayer] = useState("player-one");
  const [letterStyleBoard, setLetterStyleBoard] = useState(
    letterStyleBoardDefault
  );
  const [wordResult, setWordResult] = useState(false);
  const [turnInProgress, setTurnInProgress] = useState(false);
  const [playerRole, setPlayerRole] = useState("");
  const [T, setT] = useState(tallyDefault);
  const [letterCounter, SetLetterCounter] = useState(0);
  const [chatSocket, setChatSocket] = useState({});
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [wordHistoryModalOpen, setWordHistoryModalOpen] = useState(false);
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");

  const alert = useAlert();

  let isRoleAssigned = false;

  const playAgain = () => {
    // find restart button and click it

    var xpath = `//button[@aria-label='restart']`;
    var matchingElement = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    matchingElement.click();
  };

  useEffect(async () => {
    setHelpModalOpen(true);

    const roomName = JSON.parse(
      document.getElementById("room-name").textContent
    );

    const chatSocket = new WebSocket(
      "wss://" + window.location.host + "/ws/core/" + roomName + "/"
    );

    // // // // // // // console.log("[STARTDEBUG]: chatSocket at start")
    // // // // // // // console.log(chatSocket)
    // // // // // // // console.log("[ENDDEBUG]: chatSocket at start")

    chatSocket.onmessage = async function (e) {
      const data = JSON.parse(e.data);
      // // // // // // console.log("[LOG]: Received data: ")
      // // // // // // console.log(data)
      // // // // // // console.log("[LOG]: Setting Game States.")
      // // // // // // // console.log("[LOG]: PlayerRole: " + myContext.playerRole)

      let game_state_message =
        "game_state_message" in data
          ? JSON.parse(data["game_state_message"])
          : null;

      // // // // // console.log(game_state_message);

      let fetchedBoard =
        "board" in game_state_message ? game_state_message["board"] : null;
      let fetchedTally =
        "tally" in game_state_message ? game_state_message["tally"] : null;
      let fetchedTurnInProgress =
        "turnInProgress" in game_state_message
          ? game_state_message["turnInProgress"]
          : null;
      let fetchedCursor =
        "cursor" in game_state_message ? game_state_message["cursor"] : null;
      let fetchedWordsMade =
        "wordsMade" in game_state_message
          ? game_state_message["wordsMade"]
          : null;
      let fetchedActivePlayer =
        "activePlayer" in game_state_message
          ? game_state_message["activePlayer"]
          : null;
      let fetchedPlayerRole =
        "role" in game_state_message ? game_state_message["role"] : null;
      let fetchedLetterCounter =
        "letterCounter" in game_state_message
          ? game_state_message["letterCounter"]
          : null;
      let fetchedEndGameTally =
        "endGameTally" in game_state_message
          ? game_state_message["endGameTally"]
          : null;

      let fetchedColorBoard =
        "colorBoard" in game_state_message
          ? game_state_message["colorBoard"]
          : null;

      let fetchedLetterStyleBoard =
        "letterStyleBoard" in game_state_message
          ? game_state_message["letterStyleBoard"]
          : null;
          
      let fetchedPlayerOneName =
      "playerOneName" in game_state_message
        ? game_state_message["playerOneName"]
        : null;
        
      let fetchedPlayerTwoName =
      "playerTwoName" in game_state_message
        ? game_state_message["playerTwoName"]
        : null;
      
    

      if (fetchedColorBoard) {
        setColorBoard(fetchedColorBoard);
      }

      if (fetchedLetterStyleBoard) {
        setLetterStyleBoard(fetchedLetterStyleBoard);
      }

      if (fetchedBoard) {
        setBoard(fetchedBoard);
      }
      
      if (fetchedPlayerOneName) {
        setPlayerOneName(fetchedPlayerOneName);
      }

      if (fetchedPlayerTwoName) {
        setPlayerTwoName(fetchedPlayerTwoName);
      }


      if (fetchedLetterCounter === 0) {
        // // // // // // console.log("Setting letter count:")
        // // // // // // console.log(fetchedLetterCounter)
        SetLetterCounter(fetchedLetterCounter);
      }

      if (fetchedTally) {
        // // // // // console.log("Setting tally:");
        // // // // // console.log(fetchedTally);
        setTally(fetchedTally);
      }

      if (fetchedTurnInProgress !== null) {
        // // // // // // console.log("Setting TIP:")
        // // // // // // console.log(fetchedTurnInProgress)
        setTurnInProgress(fetchedTurnInProgress);
      }

      if (fetchedCursor) {
        // // // // // // console.log("Setting cursor:")
        // // // // // // console.log(fetchedCursor)
        setCursor(fetchedCursor);
      }

      if (fetchedWordsMade) {
        // // // // // // console.log("Setting words made:")
        // // // // // // console.log(fetchedWordsMade)
        setWordsMade(fetchedWordsMade);
      }

      if (fetchedActivePlayer) {
        // // // // // // console.log("Setting active player:")
        // // // // // // console.log(fetchedActivePlayer)
        setActivePlayer(fetchedActivePlayer["activePlayer"]);

        // // // // // console.log("activePlayer: " + fetchedActivePlayer["activePlayer"]);

        if (window.location.pathname.startsWith("/ai/")) {
          if (fetchedActivePlayer["activePlayer"] == "player-two") {
            let F_board = fetchedActivePlayer["board"];
            let F_wordsMade = fetchedActivePlayer["wordsMade"];

            setBoard(F_board);
            setWordsMade(F_wordsMade);

            // // // // // // console.log(game_state_message)
            // // // // // // console.log(fetchedActivePlayer)
            // // // // // // console.log(F_board)
            // // // // // // console.log(F_wordsMade)

            // // // console.time("GETWORDS")
            let return_value = await getLetterToPlay(F_board, F_wordsMade);
            let letter_AI = return_value[0];
            let row_AI = return_value[1];
            let column_AI = return_value[2];
            // // // console.timeEnd("GETWORDS")

            // // // // // // console.log(return_value, letter_AI, row_AI, column_AI)

            // turning the list of letter elements to 6x6 board matrix
            var matchingElement = document.getElementsByClassName("letter");
            var gameBoardTags = listToMatrix(matchingElement, 6);

            // // // // // // console.log("clicking on: )
            gameBoardTags[row_AI][column_AI].click();

            // inputting the letter
            var xpath = `//div[@class='key' and text()='${letter_AI}']`;
            var matchingElement = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            matchingElement.click();

            // pressing Enter
            var xpath = "//div[@class='key' and text()='Enter']";
            var matchingElement = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            matchingElement.click();
          }
        }
      }

      if (!isRoleAssigned) {
        // // // // // // console.log("Setting player role:")
        // // // // // // console.log(fetchedPlayerRole)
        setPlayerRole(fetchedPlayerRole);

        // this is to keep from the roles from changing while braodcasting
        isRoleAssigned = true;
      }

      if (fetchedEndGameTally) {
        // // // // // // console.log("ENDGAME")
        let currentPlayerRole = "";
        let endGameMessage = "";

        if (
          document
            .getElementsByClassName("anchor")
            .hasOwnProperty("player-one-active")
        ) {
          currentPlayerRole = "Player Blue";
        } else if (
          document
            .getElementsByClassName("anchor")
            .hasOwnProperty("player-two-active")
        ) {
          currentPlayerRole = "Player Orange";
        } else if (
          document
            .getElementsByClassName("anchor")
            .hasOwnProperty("observer-active")
        ) {
          currentPlayerRole = "Observer";
        }

        // console.log("Current: " + currentPlayerRole)
        // console.log(fetchedEndGameTally)

        if (
          fetchedEndGameTally["player-one"] >
            fetchedEndGameTally["player-two"] &&
          currentPlayerRole === "Player Blue"
        ) {
          endGameMessage = {
            label: "You won!",
            type: types.SUCCESS,
          };
        } else if (
          fetchedEndGameTally["player-one"] <
            fetchedEndGameTally["player-two"] &&
          currentPlayerRole === "Player Blue"
        ) {
          endGameMessage = {
            label: "You lost :(",
            type: types.ERROR,
          };
        } else if (
          fetchedEndGameTally["player-one"] >
            fetchedEndGameTally["player-two"] &&
          currentPlayerRole === "Observer"
        ) {
          endGameMessage = {
            label: "Blue won!",
            type: types.INFO,
          };
        } else if (
          fetchedEndGameTally["player-one"] <
            fetchedEndGameTally["player-two"] &&
          currentPlayerRole === "Observer"
        ) {
          endGameMessage = {
            label: "Orange won!",
            type: types.INFO,
          };
        } else if (
          fetchedEndGameTally["player-one"] >
            fetchedEndGameTally["player-two"] &&
          currentPlayerRole === "Player Orange"
        ) {
          endGameMessage = {
            label: "You lost :(",
            type: types.ERROR,
          };
        } else if (
          fetchedEndGameTally["player-one"] <
            fetchedEndGameTally["player-two"] &&
          currentPlayerRole === "Player Orange"
        ) {
          endGameMessage = {
            label: "You won!",
            type: types.SUCCESS,
          };
        } else if (
          fetchedEndGameTally["player-one"] ===
          fetchedEndGameTally["player-two"]
        ) {
          endGameMessage = {
            label: "Game drawn!",
            type: types.INFO,
          };
        }

        alert.show(endGameMessage["label"], {
          timeout: 0,
          type: endGameMessage["type"],
        });

        alert.info(
          <p>
            <Button
              variant="contained"
              color="success"
              size="small"
              fullWidth="True"
              onClick={playAgain}
            >
              New Game
            </Button>
          </p>,
          {
            timeout: 0,
          }
        );
        return;
      }
    };

    setChatSocket(chatSocket);
  }, []);

  // var clientUrl = window.location.href
  // var roomID = clientUrl.split("/").pop()
  // // // // // // // // console.log("Socket: ", socket)
  // // // // // // // // console.log("Client: " + roomID)
  // socket.emit('connected', roomID)

  return (
    <AppContext.Provider
      value={{
        board,
        setBoard,
        cursor,
        setCursor,
        colorBoard,
        setColorBoard,
        activePlayer,
        setActivePlayer,
        letterStyleBoard,
        setLetterStyleBoard,
        wordList,
        tally,
        setTally,
        T,
        setT,
        letterCombs,
        setLetterCombs,
        wordsMade,
        setWordsMade,
        wordResult,
        setWordResult,
        turnInProgress,
        setTurnInProgress,
        playerRole,
        setPlayerRole,
        letterCounter,
        SetLetterCounter,
        helpModalOpen,
        setHelpModalOpen,
        aboutModalOpen,
        setAboutModalOpen,
        wordHistoryModalOpen,
        setWordHistoryModalOpen,
        playerOneName,
        setPlayerOneName,
        playerTwoName,
        setPlayerTwoName,
        chatSocket,
      }}
    >
      <div className="App">
        <NavBar />
        <div className="game">
          <Scorecard />
          <GameInfo />
          <div className="board-container">
            <Board />
          </div>
          <div className="keyboard-container">
            <Keyboard />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
