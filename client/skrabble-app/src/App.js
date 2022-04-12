import './App.css';

import Keyboard from './components/Keyboard';
import Board from './components/Board';
import Scorecard from './components/Scorecard';

import { createContext, useState } from 'react';
import { boardDefault, colorBoardDefault, letterStyleBoardDefault} from './Words';

export const AppContext = createContext()

function App() {
  
  const [board, setBoard] = useState(boardDefault)
  const [cursor, setCursor] = useState([0, 0])
  const [colorBoard, setColorBoard] = useState(colorBoardDefault)
  const [activePlayer, setActivePlayer] = useState("player-one")
  const [letterStyleBoard, setLetterStyleBoard] = useState(letterStyleBoardDefault)

  return (
    <div className="App">
      <nav>
        <h1>skrabble.</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, cursor, setCursor, colorBoard, setColorBoard, activePlayer, setActivePlayer, letterStyleBoard, setLetterStyleBoard}}>
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
