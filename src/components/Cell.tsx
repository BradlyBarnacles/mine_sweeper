import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ReactElement, useEffect, useState} from 'react';
import {BombInfo} from '../utils/GenerateBoard';

interface Props {
  bombInfo?: BombInfo;
  OnDetonate?: () => void;
  isPlaying?: boolean;
}

export default function Cell({
  bombInfo,
  OnDetonate,
  isPlaying
}: Props): ReactElement {

  const [uncovered, setUncovered] = useState(false);
  const [flagged, setFlagged] = useState(false);

  useEffect(() => {
    if (uncovered && bombInfo === "bomb" && OnDetonate) {
      OnDetonate();
    }
  }, [uncovered]);

  useEffect(() => {
    setUncovered(!isPlaying);
    setFlagged(false);
  }, [isPlaying])

  if (!uncovered) {
    return (
      <button
        onClick={() => setUncovered(true)}
        onContextMenu={()=> setFlagged(!flagged)}
        style={{
          height: '20px',
          width: '20px',
          borderStyle: 'outset',
        }}>{flagged && "|>" }</button>
    );
  } else {
    const cellSymbol = bombInfo === 'bomb' ? '*' : bombInfo === 0 ? ' ' : bombInfo;
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
        }}>
        {cellSymbol}
      </p>
    );
  }
}
