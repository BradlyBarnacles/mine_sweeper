import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFlag, faBomb} from '@fortawesome/free-solid-svg-icons';

import React, {ReactElement} from 'react';
import {BombCount} from '../utils/types';
import './Cell.css';

interface Props {
  BombCount: BombCount;
  isCovered: boolean;
  isFlagged: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
}


export default function Cell({
  BombCount,
  isCovered,
  isFlagged,
  onLeftClick,
  onRightClick,
}: Props): ReactElement {
  if (isCovered) {
    return (
      <button
        onClick={onLeftClick}
        onContextMenu={e => {
          onRightClick();
          e.preventDefault(); //prevent context menu when placing flag
        }}
        className="covered cell">
        {isFlagged && (
          <FontAwesomeIcon icon={faFlag} size="sm" className="flag" />
        )}
      </button>
    );
  } else {
    //Color that numbers 1-8 are displayed as, starting with 1 as blue
    const bombCountColors = [
      '#0000ff',
      '#9cc613',
      '#ff0000',
      '#2a2a94',
      '#800000',
      '#2a9494',
      '#000000',
      '#808080',
    ];
    //Color given the bomb count, if applicable
    const color =
      BombCount !== 'bomb' && BombCount !== 0 ? bombCountColors[BombCount-1] : '';

    // choose what is to be displayed in cell. either a bomb, the number of 
    // surrounding bombs, or empty if no surrounding bombs
    const cellContent =
      BombCount === 'bomb' ? (
        <FontAwesomeIcon icon={faBomb} size="xs" className="bomb" />
      ) : BombCount === 0 ? (
        ' '
      ) : (
        BombCount
      );

    return (
      <p className="uncovered cell" style={{color}}>
        {cellContent}
      </p>
    );
  }
}
