import logo from './logo.svg';
import './App.css';

import Keyboard from './components/Keyboard';
import Board from './components/Board';

import { createContext, useState } from 'react';
import { boardDefault } from './Words';

export const AppContext = createContext()

function App() {
  
  const [board, setBoard] = useState(boardDefault)

  return (
    <div className="App">
      <nav>
        <h1>Skrabble!</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard}}>
        <Board/>
        <Keyboard/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
