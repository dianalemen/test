export default function currentMove(isXnext) {
  const x = 'X';
  const o = 'O';
  return isXnext ? x : o;
}