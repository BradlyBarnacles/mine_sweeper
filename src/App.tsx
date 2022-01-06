import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './components/Cell';
import GenerateBoard from './utils/GenerateBoard';

function App() {
  //generate bomb positions
  const bombLayout = GenerateBoard(5,5,5);

  var board: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    let row: JSX.Element[] = [];
    for (let j = 0; j < 5; j++) {
      row.push(<Cell uncovered bombInfo={bombLayout[i][j]}></Cell>);
    }
    board.push(<div style={{display: 'flex'}}>{row}</div>);
  }
  return <div style={{display: 'flex', flexDirection: 'column'}}>{board}</div>;
}

export default App;
