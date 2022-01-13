import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Board from './components/Board';
import { GameState } from './utils/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


function App() {
  const [gameState, setGameState] = useState<GameState>("playing");
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [Time, setTime] = useState(0);

  //Update timer every second
  useEffect(() => {
    const timer = setTimeout(() => {
      if (startTime === null) setTime(0);
      else setTime(Math.floor((new Date().getTime() - startTime.getTime())/1000));
    }, 1000);
    return () => clearTimeout(timer);
  }, [startTime, Time]);

  //Resets timer start time once new game started. If not playing timer is stopped
  useEffect(() => {
    if (gameState === "playing") setStartTime(new Date());
    else setStartTime(null);
  }, [gameState]);


  //Immediately start playing after reset. 
  useEffect(() => {
    if (gameState === "resetting")
      setGameState("playing");
  }, [gameState])

  const [bombCount, setBombCount] = useState(10)

 
  return (
    <div
      style={{ display: 'inline-block', padding: '10px', borderStyle: 'outset' }}>
      
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
            setGameState("resetting");
          }}
          style={{
            width: '50px',
            height: '30px',
            alignSelf: 'center',
          }}>
          reset
        </button>
        <p  style={{background: 'black', color: 'white', width: '30px'}}>{bombCount}</p>
      </div>
      <Board
        height={10}
        width={10}
        bombCount={20}
        gameState={gameState}
        OnDetonate={() => {
          setGameState("lost");
        }}
        OnFlagChange={(count) => {
          setBombCount(20 - count);
        }}
        OnWin={()=>alert("you won")}></Board>
    </div>
  );
}

export default App;
