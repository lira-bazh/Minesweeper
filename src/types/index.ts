export enum EFieldState {
  EMPTY = `empty`,
  MINE = `mine`,
}

export type TFieldState = EFieldState | number;

export type CellCoordinates = {
  x: number;
  y: number;
};

export enum EUserFieldState {
  OPENED = `opened`,
  CLOSED = `closed`,
  FLAG = `flag`,
  BANG = `bang`,
  PRESS = `press`,
}