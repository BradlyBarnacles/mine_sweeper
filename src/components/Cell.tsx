import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ReactElement} from 'react';

interface Props {
  onClick?: () => void;
  isBomb?: boolean;
  uncovered?: boolean;
  neighborCount?: number;
}

export default function Cell({
  onClick,
  isBomb,
  uncovered,
  neighborCount,
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
      <div
        style={{
          height: '20px',
          width: '20px',
          backgroundColor: 'gray',
          borderStyle: 'solid',
          borderWidth: '1px',
        }}>
        <p style={{textAlign: 'center'}}>{isBomb ? '*' : neighborCount}</p>
      </div>
    );
  }
}
