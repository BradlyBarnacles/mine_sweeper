import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './components/Cell';
import GenerateBoard from './utils/GenerateBoard';
import Board from './components/Board';

function App() {
  return (
    <div>
      <Board></Board>
      <button>reset</button>
    </div>
  );
}

export default App;
