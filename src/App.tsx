import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './components/Cell';

function App() {
  return (
    <div>
      <Cell uncovered={true}></Cell>
      <Cell uncovered={false}></Cell>
      <Cell></Cell>
    </div>
  );
}

export default App;
