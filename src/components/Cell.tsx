import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faBomb } from "@fortawesome/free-solid-svg-icons";

import React, {ReactElement, useEffect, useState} from 'react';
import {BombInfo} from '../utils/GenerateBoard';
import { GameState } from '../utils/types';

interface Props {
  bombInfo?: BombInfo;
  gameState: GameState;
  OnDetonate: () => void;
  OnFlagChanged: (hasFlag: boolean) => void;
  OnUncovered: () => void;
}

export default function Cell({
  bombInfo,
  OnDetonate,
  gameState,
  OnFlagChanged,
  OnUncovered
}: Props): ReactElement {

  const [uncovered, setUncovered] = useState(false);
  const [flagged, setFlagged] = useState(false);

  //detonate if bomb uncovered
  useEffect(() => {
    if (uncovered && bombInfo === "bomb" && OnDetonate) {
      OnDetonate();
    }
    if (uncovered)
      OnUncovered()
  }, [uncovered]);

  //update cell display when game state change
  useEffect(() => {
    if (gameState === "resetting") return; 

    if (gameState === "lost") setUncovered(true);
    if (gameState === "playing") setUncovered(false);
    
    setFlagged(false);
  }, [gameState])

  if (!uncovered) {
    return (
      <button
        onClick={() =>{ if(!flagged) setUncovered(true)}}
        onContextMenu={(e) => { setFlagged(!flagged); OnFlagChanged(!flagged);  e.preventDefault()}}
        style={{
          height: '20px',
          width: '20px',
          borderStyle: 'outset',
          boxSizing: 'border-box'
        }}>{flagged && <FontAwesomeIcon icon={faFlag} size='sm' style={{ color: "red"}}/> }</button>
    );
  } else {
    return (
      <p
        style={{
          textAlign: 'center',
          height: '20px',
          width: '20px',
          margin: '0px',
          backgroundColor: 'gray',
          borderStyle: 'solid',
          borderWidth: '1px',
          boxSizing: 'border-box'
        }}>
        { bombInfo === 'bomb' ?<FontAwesomeIcon icon={faBomb} size='xs' style={{ marginTop: "5px",verticalAlign: "top"}}/> : bombInfo === 0 ? ' ' : bombInfo}
      </p>
    );
  }
}
