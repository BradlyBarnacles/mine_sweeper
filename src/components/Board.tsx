import React, {ReactElement, useEffect, useState} from 'react';
import GenerateBoard, { BombInfo } from '../utils/GenerateBoard';
import { GameState } from '../utils/types';
import Cell from './Cell';

interface Props {
  height: number;
  width: number;
  bombCount: number;
  gameState: GameState;
  OnDetonate: () => void;
}

export default function Board({
  height,
  width,
  bombCount,
  gameState,
  OnDetonate,

}: Props): ReactElement {

  const [bombPlacements, setBombPlacements] = useState<BombInfo[][]>(GenerateBoard(height, width, bombCount));
  const [boardElements, setBoardElements] = useState<JSX.Element[]>([]);
  
	//Generate new bomb placements when game starts playing
  useEffect(() => {
    if(gameState === 'playing')
      setBombPlacements(GenerateBoard(height, width, bombCount))
    
  }, [gameState, height, width, bombCount]);

  //Update the board Elements 
  useEffect(() => {
    let newBoardElements: JSX.Element[] = [];
    for (let i = 0; i < height; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < width; j++) {
        row.push(
          <Cell
            OnDetonate={OnDetonate}
            bombInfo={bombPlacements[i][j]}
            gameState={gameState}></Cell>,
        );
      }
      newBoardElements.push(<div style={{display: 'flex'}}>{row}</div>);
    }
    setBoardElements(newBoardElements);
  
  }, [bombPlacements, gameState])
  
  return <div style={{display: 'flex', flexDirection: 'column', borderStyle:"inset"}}>{boardElements}</div>;
}
