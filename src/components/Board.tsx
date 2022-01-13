import React, {ReactElement, useEffect, useState} from 'react';
import GenerateBoard, {BombInfo} from '../utils/GenerateBoard';
import {GameState} from '../utils/types';
import Cell from './Cell';

interface Props {
  height: number;
  width: number;
  bombCount: number;
  gameState: GameState;
  OnDetonate: () => void;
  OnFlagChange: (count: number) => void;
  OnWin: () => void;
}

export default function Board({
  height,
  width,
  bombCount,
  gameState,
  OnDetonate,
  OnFlagChange,
  OnWin,
}: Props): ReactElement {
  const [bombPlacements, setBombPlacements] = useState<BombInfo[][]>(
    GenerateBoard(height, width, bombCount),
  );
  const [flagCount, setFlagCount] = useState(0);
  const [remainingCovered, setRemainingCovered] = useState(
    height * width - bombCount,
  );

  //Generate new bomb placements when game starts playing
  useEffect(() => {
    if (gameState === 'playing') {
      setBombPlacements(GenerateBoard(height, width, bombCount));
      setFlagCount(0);
      setRemainingCovered(height * width - bombCount,)
    }
  }, [gameState, height, width, bombCount]);

  useEffect(() => {
    OnFlagChange(flagCount);
  }, [flagCount]);

  useEffect(() => {
    if (remainingCovered === 0) {
      OnWin();
    }
    console.log(remainingCovered);
  }, [remainingCovered]);

  let boardElements: JSX.Element[] = [];
  for (let i = 0; i < height; i++) {
    let row: JSX.Element[] = [];
    for (let j = 0; j < width; j++) {
      row.push(
        <Cell
          key={`cell y:${j}`}
          OnDetonate={OnDetonate}
          bombInfo={bombPlacements[i][j]}
          gameState={gameState}
          OnFlagChanged={change => {
            setFlagCount(flagCount + (change ? 1 : -1));
          }}
          OnUncovered={() => setRemainingCovered(remainingCovered - 1)}></Cell>,
      );
    }
    boardElements.push(<div key={`row x:${i}`} style={{display: 'flex'}}>{row}</div>);
  }

  return (
    <div
      style={{display: 'flex', flexDirection: 'column', borderStyle: 'inset'}}>
      {boardElements}
    </div>
  );
}
