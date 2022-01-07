export type BombInfo = 'bomb' | number;

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export default function GenerateBoard(
  width: number,
  height: number,
  numberOfBombs: number,
): BombInfo[][] {
  //init matrix with all zeros
  var board: BombInfo[][] = new Array(width)
    .fill(0)
    .map(x => new Array(height).fill(0));

  let bombsPlaced = 0;
  while (bombsPlaced < numberOfBombs) {
    let x = randomInt(width);
    let y = randomInt(height);

    if (board[x][y] !== 'bomb') {
      board[x][y] = 'bomb';
      bombsPlaced++;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          try {
            var neighbor = board[x + i][y + j];
            if (neighbor !== 'bomb') {
              board[x + i][y + j] = neighbor + 1;
            }
          } catch {}
        }
      }
    }
  }

  return board;
}
