import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './components/Cell';
import GenerateBoard from './utils/GenerateBoard';
import Board from './components/Board';

function App() {
  const [IsPlaying, setIsPlaying] = useState(true);

  return (
    <div>
      <Board
        height={5}
        width={5}
        bombCount={5}
        isPlaying={IsPlaying}
        OnDetonate={() => {
          setIsPlaying(false);
        }}></Board>
      <button onClick={() => { setIsPlaying(false); setIsPlaying(true) }}>reset</button>
    </div>
  );
}

export default App;
