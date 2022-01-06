import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ReactElement} from 'react';
import {BombInfo} from '../utils/GenerateBoard';

interface Props {
  onClick?: () => void;
  uncovered?: boolean;
  bombInfo?: BombInfo;
}

export default function Cell({
  onClick,
  uncovered,
  bombInfo,
}: Props): ReactElement {
  if (!uncovered) {
    return (
      <button
        onClick={onClick}
        style={{
          height: '20px',
          width: '20px',
          borderStyle: 'outset',
        }}></button>
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
