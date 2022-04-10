import logo from './logo.svg';
import './App.css';

import Keyboard from './components/Keyboard';
import Board from './components/Board';

import { createContext, useState } from 'react';
import { boardDefault, cursorDefault, colorBoardDefault, activePlayerDefault } from './Words';

export const AppContext = createContext()

function App() {
  
  const [board, setBoard] = useState(boardDefault)
  const [cursor, setCursor] = useState(cursorDefault)
  const [colorBoard, setColorBoard] = useState(colorBoardDefault)
  const [activePlayer, setActivePlayer] = useState(activePlayerDefault)


  return (
    <div className="App">
      <nav>
        <h1>Skrabble!</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, cursor, setCursor, colorBoard, setColorBoard, activePlayer, setActivePlayer}}>
        <div className='game'>
          <Board/>
          <Keyboard/>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
