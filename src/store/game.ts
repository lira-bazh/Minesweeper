import { createSlice, type PayloadAction, type WritableDraft } from '@reduxjs/toolkit';
import { GameService } from '@/services/game';
import { EUserFieldState, type TFieldState } from '@/types';

export interface IGameSlice {
  size: number;
  startNumberOfMines: number;
  numberOfMines: number;
  numberOfFlags: number;
  minefield: TFieldState[][];
  userField: EUserFieldState[][];
  gameover: boolean;
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: GameService.getInitialStateBySize(),
  reducers: {
    openCell: (
      state: WritableDraft<IGameSlice>,
      action: PayloadAction<{ row: number; column: number }>,
    ) => {
      const { row, column } = action.payload;
      state = GameService.openCell(row, column, state);
    },
    pressCell: (state: WritableDraft<IGameSlice>, action: PayloadAction<{ row: number; column: number }>) => {
      const { row, column } = action.payload;
      state = GameService.pressAroundCell(row, column, state);
    },
    openAroundCell: (state: WritableDraft<IGameSlice>, action: PayloadAction<{ row: number; column: number }>) => {
      const { row, column } = action.payload;
      state = GameService.openAroundCell(row, column, state);
    },
    setFlag: (state: WritableDraft<IGameSlice>, action: PayloadAction<{ row: number; column: number }>) => {
      const { row, column } = action.payload;
      state = GameService.setFlag(row, column, state);
    },
    reboot: (state: WritableDraft<IGameSlice>) => {
      state.gameover = false;
      state.numberOfMines = state.startNumberOfMines;
      state.numberOfFlags = state.startNumberOfMines;
      state.minefield = GameService.createFilledField(state.size, state.startNumberOfMines);
      state.userField = GameService.createUserField(state.size);
    },
    changeUserSettings: (
      state: WritableDraft<IGameSlice>,
      action: PayloadAction<{ size: number; numMines: number }>,
    ) => {
      const { size, numMines } = action.payload;

      GameService.saveUserSettings(size, numMines);

      state.gameover = false;
      state.size = size;
      state.startNumberOfMines = numMines;
      state.numberOfMines = state.startNumberOfMines;
      state.numberOfFlags = state.startNumberOfMines;
      state.minefield = GameService.createFilledField(state.size, state.startNumberOfMines);
      state.userField = GameService.createUserField(state.size);
    },
  },
});

export const { openCell, pressCell, setFlag, reboot, openAroundCell, changeUserSettings } =
  gameSlice.actions;
