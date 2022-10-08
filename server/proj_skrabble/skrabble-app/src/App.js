import './App.css';
import { useEffect, useRef } from 'react';
import { useAlert } from 'react-alert'

import Keyboard from './components/Keyboard';
import Board from './components/Board';
import Scorecard from './components/Scorecard';
import GameInfo from './components/GameInfo';

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
  const [playerRole, setPlayerRole] = useState("")
  // const [isRoleAssigned, setIsRoleAssigned] = useState(false)
  const [T, setT] = useState(tallyDefault)
  const [letterCounter, SetLetterCounter] = useState(0)
  const alert = useAlert()

  let isRoleAssigned = false


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
        console.log("[LOG]: Received data: ")
        console.log(data)
        console.log("[LOG]: Setting Game States.")

        let game_state_message = JSON.parse(data["game_state_message"])

        let fetchedBoard = "board" in game_state_message ? game_state_message["board"] : null
        let fetchedTally = "tally" in game_state_message ? game_state_message["tally"] : null
        let fetchedTurnInProgress = "turnInProgress" in game_state_message ? game_state_message["turnInProgress"] : null
        let fetchedCursor = "cursor" in game_state_message ? game_state_message["cursor"] : null
        let fetchedWordsMade = "wordsMade" in game_state_message ? game_state_message["wordsMade"] : null
        let fetchedActivePlayer = "activePlayer" in game_state_message ? game_state_message["activePlayer"] : null
        let fetchedPlayerRole = "role" in game_state_message ? game_state_message["role"] : null
        let fetchedLetterCounter = "letterCounter" in game_state_message ? game_state_message["letterCounter"] : null

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


        if (!isRoleAssigned){
          console.log("Setting player role:")
          console.log(fetchedPlayerRole)
          setPlayerRole(fetchedPlayerRole)
          
          // this is to keep from the roles from changing while braodcasting
          isRoleAssigned = true
        }

        if (fetchedLetterCounter){
          console.log("Setting letter count:")
          console.log(fetchedLetterCounter)
          SetLetterCounter(fetchedLetterCounter)
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
      <AppContext.Provider value={{board, setBoard, cursor, setCursor, colorBoard, setColorBoard, activePlayer, setActivePlayer, letterStyleBoard, setLetterStyleBoard, wordList, tally, setTally, T, setT, letterCombs, setLetterCombs, wordsMade, setWordsMade, wordResult, setWordResult, turnInProgress, setTurnInProgress, playerRole, setPlayerRole, letterCounter, SetLetterCounter, chatSocket}}>
        <div className='game'>
          <Scorecard/>
          <GameInfo/>
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
