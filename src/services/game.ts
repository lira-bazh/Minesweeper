import { EFieldState, EUserFieldState } from '@/types';
import type { TFieldState, CellCoordinates } from '@/types';
import { BASE_NUMBER } from '@/constants';

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

  createFilledField(size: number = BASE_NUMBER, numMines: number = BASE_NUMBER): TFieldState[][] {
    const field = this.createEmptyField<TFieldState>(size, EFieldState.EMPTY);

    for (let i = 0; i < numMines; i++) {
      let cell: CellCoordinates;

      do {
        cell = this.getRandomCell(size);
      } while (field[cell.x][cell.y] === EFieldState.MINE);

      field[cell.x][cell.y] = EFieldState.MINE;
    }

    return field;
  },

  createUserField(size: number = BASE_NUMBER): EUserFieldState[][] {
    return this.createEmptyField(size, EUserFieldState.CLOSED);
  },
};
