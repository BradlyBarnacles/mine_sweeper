import React, {ReactElement} from 'react';

interface Props {
  onClick?: () => void;
  isBomb?: boolean;
  uncovered?: boolean;
}

export default function Cell({
  onClick,
  isBomb,
  uncovered,
}: Props): ReactElement {
  if (!uncovered) {
    return (
      <button
        onClick={onClick}
        style={{
          height: '20px',
          width: '20px',
          borderStyle: 'solid',
          borderColor: 'lightgray lightgray gray gray',
        }}></button>
    );
  } else {
    return (
      <div
        style={{
          height: '20px',
          width: '20px',
          backgroundColor: 'gray',
        }}></div>
    );
  }
}
