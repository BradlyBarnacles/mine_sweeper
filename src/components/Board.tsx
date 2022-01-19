import React, {ReactElement, useEffect, useState} from 'react';
import GenerateBoard from '../utils/GenerateBoard';
import {InitMatrix} from '../utils/InitMatrix';
import {BombCount, GameState} from '../utils/types';
import Cell from './Cell';

interface Props {
  height: number;
  width: number;
  bombCount: number;
  gameState: GameState;
  OnDetonate: () => void;
  OnFlagChange: (count: number) => void;
  OnWin: () => void;
  OnStart: () => void;
}

export default function Board({
  height,
  width,
  bombCount,
  gameState,
  OnDetonate,
  OnFlagChange,
  OnWin,
  OnStart,
}: Props): ReactElement {
  const [bombPlacements, setBombPlacements] = useState<BombCount[][]>(
    GenerateBoard(height, width, bombCount),
  );
  const [flaggedCells, setFlaggedCells] = useState<boolean[][]>(
    InitMatrix(height, width, false),
  );
  const [coveredCells, setCoveredCells] = useState<boolean[][]>(
    InitMatrix(height, width, true),
  );

  useEffect(() => {
    switch (gameState) {
      //Generate new bomb placements when game starts playing, and reset flags and covered cells
      case 'resetting':
        setBombPlacements(GenerateBoard(height, width, bombCount));
        setCoveredCells(InitMatrix(height, width, true));
        setFlaggedCells(InitMatrix(height, width, false));
        break;
      //uncover all cells upon loosing
      case 'lost':
        setCoveredCells(InitMatrix(height, width, false));
        break;
      default:
        break;
    }
  }, [gameState]);

  useEffect(() => {
    //Callback current number of flags whenever there is a change
    OnFlagChange(flaggedCells.flat().filter(e => e).length);
  }, [flaggedCells]);

  useEffect(() => {
    //Each time new covered cells changes, check if the game is won
    if (coveredCells.flat().filter(e => e).length === bombCount) OnWin();
  }, [coveredCells]);


  useEffect(() => {
    //Regenerate board if the height, width or number of bombs changes
    setBombPlacements(GenerateBoard(height, width, bombCount));
    setCoveredCells(InitMatrix(height, width, true));
    setFlaggedCells(InitMatrix(height, width, false));
  }, [height, width, bombCount]);

  const UncoverSafe = (x: number, y: number, newCovered: boolean[][]) => {
    var CellsToCheck = [[x, y]];
    while (CellsToCheck.length !== 0) {
      let CurrentCell = CellsToCheck.pop()!;
      for (let xOffset = -1; xOffset < 2; xOffset++) {
        for (let yOffset = -1; yOffset < 2; yOffset++) {
          try {
            if (
              bombPlacements[CurrentCell[0] + xOffset][
                CurrentCell[1] + yOffset
              ] === 0 &&
              newCovered[CurrentCell[0] + xOffset][CurrentCell[1] + yOffset] ===
                true
            ) {
              CellsToCheck.push([
                CurrentCell[0] + xOffset,
                CurrentCell[1] + yOffset,
              ]);
            }
            newCovered[CurrentCell[0] + xOffset][CurrentCell[1] + yOffset] =
              false;
          } catch {}
        }
      }
    }
    return newCovered;
  };

  let boardElements: JSX.Element[] = [];
  for (let x = 0; x < bombPlacements.length; x++) {
    let row: JSX.Element[] = [];
    for (let y = 0; y < bombPlacements[x].length; y++) {
      row.push(
        <Cell
          key={`x:${x} y:${y}`}
          onLeftClick={() => {
            if (flaggedCells[x][y] === true) return;
            if (gameState === 'resetting') OnStart();

            const newCovered = [...coveredCells];
            newCovered[x][y] = false;

            if (bombPlacements[x][y] === 'bomb') {
              OnDetonate();
            }
            if (bombPlacements[x][y] === 0) {
              UncoverSafe(x, y, newCovered);
            }

            setCoveredCells(newCovered);
          }}
          BombCount={bombPlacements[x][y]}
          onRightClick={() => {
            const newFlagged = [...flaggedCells];
            newFlagged[x][y] = !newFlagged[x][y];
            setFlaggedCells(newFlagged);
          }}
          isCovered={coveredCells[x][y]}
          isFlagged={flaggedCells[x][y]}></Cell>,
      );
    }
    boardElements.push(
      <div key={`row x:${x}`} style={{display: 'flex'}}>
        {row}
      </div>,
    );
  }

  return (
    <div
      style={{display: 'flex', flexDirection: 'column', borderStyle: 'inset'}}>
      {boardElements}
    </div>
  );
}
