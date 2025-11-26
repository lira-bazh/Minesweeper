import { EFieldState, EUserFieldState } from '@/types';
import type { TFieldState, CellCoordinates } from '@/types';
import { BASE_NUMBER } from '@/constants';
import { type IGameSlice } from '@/store';

export const GameService = {
  getRandomCell(size: number): CellCoordinates {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    return { x, y };
  },

  createEmptyField<T extends TFieldState | EUserFieldState>(size: number, state: T): T[][] {
    const field = [];

    for (let i = 0; i < size; i++) {
      field.push(new Array(size).fill(state));
    }

    return field;
  },

  neighborCellTraversal(
    size: number,
    row: number,
    column: number,
    callback: (x: number, y: number) => void,
  ): void {
    for (let x = Math.max(0, row - 1); x <= Math.min(size - 1, row + 1); x++) {
      for (let y = Math.max(0, column - 1); y <= Math.min(size - 1, column + 1); y++) {
        callback(x, y);
      }
    }
  },

  createFilledField(size: number = BASE_NUMBER, numMines: number = BASE_NUMBER): TFieldState[][] {
    const field = this.createEmptyField<TFieldState>(size, EFieldState.EMPTY);

    for (let i = 0; i < numMines; i++) {
      let cell: CellCoordinates;

      do {
        cell = this.getRandomCell(size);
      } while (field[cell.x][cell.y] === EFieldState.MINE);

      field[cell.x][cell.y] = EFieldState.MINE;

      this.neighborCellTraversal(size, cell.x, cell.y, (x, y) => {
        if (typeof field[x][y] === 'number') {
          field[x][y] = Number(field[x][y]) + 1;
        }

        if (field[x][y] === EFieldState.EMPTY) {
          field[x][y] = 1;
        }
      });
    }

    return field;
  },

  createUserField(size: number = BASE_NUMBER): EUserFieldState[][] {
    return this.createEmptyField(size, EUserFieldState.CLOSED);
  },

  openEmptyCell(row: number, column: number, state: IGameSlice): IGameSlice {
    if (state.userField[row][column] === EUserFieldState.CLOSED) {
      if (state.minefield[row][column] === EFieldState.EMPTY) {
        state.userField[row][column] = EUserFieldState.OPENED;

        this.neighborCellTraversal(state.size, row, column, (x, y) => {
          state = this.openEmptyCell(x, y, state);
        });
      } else {
        state.userField[row][column] = EUserFieldState.OPENED;
      }
    }

    return state;
  },

  openCell(row: number, column: number, state: IGameSlice): IGameSlice {
    if (state.userField[row][column] !== EUserFieldState.FLAG) {
      const mineCell = state.minefield[row][column];

      if (mineCell === EFieldState.MINE) {
        state.userField = state.userField.map(row => row.map(() => EUserFieldState.OPENED));
        state.userField[row][column] = EUserFieldState.BANG;
        state.gameover = true;
      } else {
        state = this.openEmptyCell(row, column, state);
      }
    }

    return state;
  },

  setFlag(row: number, column: number, state: IGameSlice): IGameSlice {
    switch (state.userField[row][column]) {
      case EUserFieldState.CLOSED:
        state.userField[row][column] = EUserFieldState.FLAG;

        if (state.minefield[row][column] === EFieldState.MINE) {
          state.numberOfMines--;

          if (!state.numberOfMines) {
            state.gameover = true;
            state.userField = state.userField.map(row => row.map(() => EUserFieldState.OPENED));
          }
        }
        break;
      case EUserFieldState.FLAG:
        state.userField[row][column] = EUserFieldState.CLOSED;

        if (state.minefield[row][column] === EFieldState.MINE) {
          state.numberOfMines++;
        }
        break;
    }

    return state;
  }
};
