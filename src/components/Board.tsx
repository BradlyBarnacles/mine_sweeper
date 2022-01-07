import React, {ReactElement, useEffect, useState} from 'react';
import GenerateBoard from '../utils/GenerateBoard';
import Cell from './Cell';

interface Props {
  height: number;
  width: number;
  bombCount: number;
  isPlaying: boolean;
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

  const [board, setBoard] = useState<JSX.Element[]>([]);

	

  useEffect(() => {

    const bombLayout = GenerateBoard(height, width, bombCount);
    let newBoard: JSX.Element[] = [];
    for (let i = 0; i < height; i++) {
      let row: JSX.Element[] = [];
      for (let j = 0; j < width; j++) {
        row.push(
          <Cell
            OnDetonate={OnDetonate}
            bombInfo={bombLayout[i][j]}
            isPlaying={isPlaying}></Cell>,
        );
      }
      newBoard.push(<div style={{display: 'flex'}}>{row}</div>);
    }
    setBoard(newBoard);
  }, [isPlaying, height, width, bombCount, isPlaying]);

  return <div style={{display: 'flex', flexDirection: 'column', borderStyle:"inset"}}>{board}</div>;
}
