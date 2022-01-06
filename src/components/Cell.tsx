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
        {bombInfo === 'bomb' ? '*' : bombInfo}
      </p>
    );
  }
}
