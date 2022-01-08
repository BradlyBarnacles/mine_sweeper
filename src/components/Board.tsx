import React, {ReactElement, useEffect, useState} from 'react';
import GenerateBoard, { BombInfo } from '../utils/GenerateBoard';
import Cell from './Cell';

interface Props {
  height: number;
  width: number;
  bombCount: number;
  isPlaying: boolean | null;
  OnDetonate: () => void;
}

export default function Board({
  height,
  width,
  bombCount,
  isPlaying,
  OnDetonate,
}: Props): ReactElement {
  //generate bomb positions

  const [board, setBoard] = useState<BombInfo[][]>(GenerateBoard(height, width, bombCount));
  const [boardElements, setBoardElements] = useState<JSX.Element[]>([]);
	
  useEffect(() => {
    if(isPlaying)
      setBoard(GenerateBoard(height, width, bombCount))
    
  }, [isPlaying, height, width, bombCount]);

  useEffect(() => {
    let newBoardElements: JSX.Element[] = [];
    for (let i = 0; i < height; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < width; j++) {
        row.push(
          <Cell
            OnDetonate={OnDetonate}
            bombInfo={board[i][j]}
            isPlaying={isPlaying}></Cell>,
        );
      }
      newBoardElements.push(<div style={{display: 'flex'}}>{row}</div>);
    }
    setBoardElements(newBoardElements);
  
  }, [board, isPlaying])
  
  return <div style={{display: 'flex', flexDirection: 'column', borderStyle:"inset"}}>{boardElements}</div>;
}
