import './App.css';

import Keyboard from './components/Keyboard';
import Board from './components/Board';
import Scorecard from './components/Scorecard';

import { createContext, useState } from 'react';
import { colorBoardDefault, letterStyleBoardDefault, mainBoardDefault, tallyDefault} from './Initializer';
import { wordList } from './Words';

export const AppContext = createContext()

function App() {

  const [board, setBoard] = useState(mainBoardDefault)
  const [letterCombs, setLetterCombs] = useState(new Set())
  const [wordsMade, setWordsMade] = useState(new Set())
  const [cursor, setCursor] = useState([0, 0])
  const [tally, setTally] = useState(tallyDefault)
  const [colorBoard, setColorBoard] = useState(colorBoardDefault)
  const [activePlayer, setActivePlayer] = useState("player-one")
  const [letterStyleBoard, setLetterStyleBoard] = useState(letterStyleBoardDefault)
  const {wordResult, setWordResult} = useState(false)
  const {T, setT} = useState(tallyDefault)

  return (
    <div className="App">
      <nav>
        <h1>skrabble.</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, cursor, setCursor, colorBoard, setColorBoard, activePlayer, setActivePlayer, letterStyleBoard, setLetterStyleBoard, wordList, tally, setTally, T, setT, letterCombs, setLetterCombs, wordsMade, setWordsMade, wordResult, setWordResult}}>
        <div className='game'>
          <div className='board-container'>
            <Board/>
          </div>
          <Scorecard/>
          <Keyboard/>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
