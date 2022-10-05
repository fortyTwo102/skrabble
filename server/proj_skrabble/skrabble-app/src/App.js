import './App.css';
import { io } from "socket.io-client";
import { useEffect, useRef } from 'react';

import Keyboard from './components/Keyboard';
import Board from './components/Board';
import Scorecard from './components/Scorecard';

import { createContext, useState } from 'react';
import { colorBoardDefault, letterStyleBoardDefault, mainBoardDefault, tallyDefault} from './Initializer';
import { wordList } from './Words';

export const AppContext = createContext()

function App() {

  // State Management
  const [board, setBoard] = useState(mainBoardDefault)
  const [letterCombs, setLetterCombs] = useState(new Set())
  const [wordsMade, setWordsMade] = useState([])
  const [cursor, setCursor] = useState([0, 0])
  const [tally, setTally] = useState(tallyDefault)
  const [colorBoard, setColorBoard] = useState(colorBoardDefault)
  const [activePlayer, setActivePlayer] = useState("player-one")
  const [letterStyleBoard, setLetterStyleBoard] = useState(letterStyleBoardDefault)
  const [wordResult, setWordResult] = useState(false)
  const [turnInProgress, setTurnInProgress] = useState(false)
  const [T, setT] = useState(tallyDefault)


  const [chatSocket, setChatSocket] = useState({});
  const roomName = useRef();

  useEffect(() => {
    const roomName = JSON.parse(document.getElementById('room-name').textContent);
    const chatSocket = new WebSocket(
        'ws://' +
        window.location.host +
        '/ws/core/' +
        roomName +
        '/'
    );

    // console.log("[STARTDEBUG]: chatSocket at start")
    // console.log(chatSocket)
    // console.log("[ENDDEBUG]: chatSocket at start")

    chatSocket.onmessage = function (e) {

        const data = JSON.parse(e.data);
        console.log("[App.js]: Setting Game States.")

        let game_state_message = JSON.parse(data["game_state_message"])

        let fetchedBoard = "board" in game_state_message ? game_state_message["board"] : null
        let fetchedTally = "tally" in game_state_message ? game_state_message["tally"] : null
        let fetchedTurnInProgress = "turnInProgress" in game_state_message ? game_state_message["turnInProgress"] : null
        let fetchedCursor = "cursor" in game_state_message ? game_state_message["cursor"] : null
        let fetchedWordsMade = "wordsMade" in game_state_message ? game_state_message["wordsMade"] : null
        let fetchedActivePlayer = "activePlayer" in game_state_message ? game_state_message["activePlayer"] : null

        if (fetchedBoard) {
          setBoard(fetchedBoard)
        }

        if (fetchedTally){
          console.log("Setting tally:")
          console.log(fetchedTally)
          setTally(fetchedTally)
        }

        if (fetchedTurnInProgress !== null){
          console.log("Setting TIP:")
          console.log(fetchedTurnInProgress)
          setTurnInProgress(fetchedTurnInProgress)
        }
        
        if(fetchedCursor){
          console.log("Setting cursor:")
          console.log(fetchedCursor)
          setCursor(fetchedCursor)
        }

        if (fetchedWordsMade){
          console.log("Setting words made:")
          console.log(fetchedWordsMade)
          setWordsMade(fetchedWordsMade)
        }

        if (fetchedActivePlayer){
          console.log("Setting active player:")
          console.log(fetchedActivePlayer)
          setActivePlayer(fetchedActivePlayer)
        }
        
    }

    setChatSocket(chatSocket)

  }, []);

  // var clientUrl = window.location.href
  // var roomID = clientUrl.split("/").pop()
  // console.log("Socket: ", socket)
  // console.log("Client: " + roomID)
  // socket.emit('connected', roomID)


  return (
    <div className="App">
      <nav>
        <h1>skrabble.</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, cursor, setCursor, colorBoard, setColorBoard, activePlayer, setActivePlayer, letterStyleBoard, setLetterStyleBoard, wordList, tally, setTally, T, setT, letterCombs, setLetterCombs, wordsMade, setWordsMade, wordResult, setWordResult, turnInProgress, setTurnInProgress, chatSocket}}>
        <div className='game'>
          <Scorecard/>
          <div className='board-container'>
            <Board/>
          </div>
          <div className='keyboard-container'>
            <Keyboard/>
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
