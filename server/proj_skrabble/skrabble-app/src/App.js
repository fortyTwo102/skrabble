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
  const [wordsMade, setWordsMade] = useState(new Set())
  const [cursor, setCursor] = useState([0, 0])
  const [tally, setTally] = useState(tallyDefault)
  const [colorBoard, setColorBoard] = useState(colorBoardDefault)
  const [activePlayer, setActivePlayer] = useState("player-one")
  const [letterStyleBoard, setLetterStyleBoard] = useState(letterStyleBoardDefault)
  const [wordResult, setWordResult] = useState(false)
  const [turnInProgress, setTurnInProgress] = useState(false)
  const [T, setT] = useState(tallyDefault)


  const chatSocket = useRef();
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

    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log(data["message"])
    }
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
      <AppContext.Provider value={{board, setBoard, cursor, setCursor, colorBoard, setColorBoard, activePlayer, setActivePlayer, letterStyleBoard, setLetterStyleBoard, wordList, tally, setTally, T, setT, letterCombs, setLetterCombs, wordsMade, setWordsMade, wordResult, setWordResult, turnInProgress, setTurnInProgress}}>
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
