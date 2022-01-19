export type GameState = "playing" | "lost" | "won" | "resetting";

export type BombCount = 'bomb' | number;
export type CellProps = { bombCount: BombCount; isFlagged: Boolean;  isCovered: boolean} 