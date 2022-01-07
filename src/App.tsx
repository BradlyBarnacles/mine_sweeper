import React, {useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './components/Cell';
import GenerateBoard from './utils/GenerateBoard';
import Board from './components/Board';

function App() {
  const [IsPlaying, setIsPlaying] = useState(true);
  const [startTime, setStartTime] = useState(new Date());
  const [Time, setTime] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date().getUTCSeconds() - startTime.getUTCSeconds());
    }, 1000);

    return () => clearTimeout(timer);
  });

  document.addEventListener('contextmenu', event => {
    event.preventDefault();
  });

  return (
    <div
      style={{display: 'inline-block', padding: '10px', borderStyle: 'outset'}}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: '10px',
          borderStyle: 'inset',
    
        }}>
        <p style={{background: 'black', color: 'white', width: '30px'}}>
          {Time}
        </p>
        <button
          onClick={() => {
            setIsPlaying(false);
            setIsPlaying(true);
          }}
          style={{
            width: '50px',
            height: '30px',
          alignSelf:"center"}}>
          reset
        </button>
        <p style={{background: 'black', color: 'white', width: '30px'}}>5</p>
      </div>
      <Board
        height={10}
        width={10}
        bombCount={20}
        isPlaying={IsPlaying}
        OnDetonate={() => {
          setIsPlaying(false);
        }}></Board>
    </div>
  );
}

export default App;
