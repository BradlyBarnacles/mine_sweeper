import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Board from './components/Board';
import {GameState} from './utils/types';
import Select from 'react-select';
import Timer from './components/Timer';

const gameSizeOptions = [
  {name: 'Beginner', height: 9, width: 9, bombs: 10},
  {name: 'Intermediate', height: 16, width: 16, bombs: 40},
  {name: 'Expert', height: 16, width: 30, bombs: 99},
];

function App() {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [gameSize, setGameSize] = useState(gameSizeOptions[0]);
  const [bombCount, setBombCount] = useState(10);

  useEffect(() => {
    setGameState('resetting');
  }, [gameSize]);

  return (
    <div>
      <div className="game-container">
        <div className="top-container">
          <Timer
            className="counter-box"
            isRunning={gameState === 'playing'}
            reset={gameState === 'resetting'}
            OnStop={(time: number) => {
              if (gameState === 'won') alert(`you beat ${gameSize.name} difficulty in ${time} seconds`);
            }}
          />
          <button
            onClick={() => {
              setGameState('resetting');
            }}
            className="reset-button">
            reset
          </button>
          <p className="counter-box">{bombCount}</p>
        </div>
        <Board
          height={gameSize.height}
          width={gameSize.width}
          bombCount={gameSize.bombs}
          gameState={gameState}
          OnDetonate={() => {
            setGameState('lost');
          }}
          OnFlagChange={count => {
            setBombCount(gameSize.bombs - count);
          }}
          OnStart={() => setGameState('playing')}
          OnWin={() => setGameState('won')}></Board>
      </div>
      <Select
        className='select'
        value={gameSize}
        getOptionLabel={size => size.name}
        options={gameSizeOptions}
        backspaceRemovesValue={true}
        onChange={option =>
          setGameSize(
            option as {
              name: string;
              height: number;
              width: number;
              bombs: number;
            },
          )
        }
      />
    </div>
  );
}

export default App;
