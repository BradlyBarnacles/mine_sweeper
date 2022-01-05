import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './components/Cell';

function App() {
  //generate bomb positions

  var board: JSX.Element[] = [];
  for (let i = 0; i < 10; i++) {
    let row: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
      row.push(<Cell uncovered></Cell>);
    }
    board.push(<div style={{display: 'flex'}}>{row}</div>);
  }
  return <div style={{display: 'flex', flexDirection: 'column'}}>{board}</div>;
}

export default App;
