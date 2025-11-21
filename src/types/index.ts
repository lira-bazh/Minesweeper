export enum EFieldState {
  EMPTY = `empty`,
  MINE = `mine`,
  FLAG = `flag`,
}

export type TFieldState = EFieldState | number;

export type CellCoordinates = {
  x: number;
  y: number;
};

export enum EUserFieldState {
  OPENED = `opened`,
  CLOSED = `closed`,
}