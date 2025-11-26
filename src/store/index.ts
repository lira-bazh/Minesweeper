import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { GameService } from '@/services/game';
import { BASE_NUMBER } from '@/constants';
import { EUserFieldState, type TFieldState } from '@/types';

export interface IGameSlice {
  size: number;
  numberOfMines: number;
  minefield: TFieldState[][];
  userField: EUserFieldState[][];
  gameover: boolean;
}

const initialState: IGameSlice = {
  gameover: false,
  size: BASE_NUMBER,
  numberOfMines: BASE_NUMBER,
  minefield: GameService.createFilledField(),
  userField: GameService.createUserField(),
};

const gameSlice = createSlice({
  name: 'playingField',
  initialState,
  reducers: {
    openCell: (state, action: PayloadAction<{ row: number; column: number }>) => {
      const { row, column } = action.payload;
      state = GameService.openCell(row, column, state);
    },
    setFlag: (state, action: PayloadAction<{ row: number; column: number }>) => {
      const { row, column } = action.payload;
      state = GameService.setFlag(row, column, state);
    },
    reboot: (state) => {
      state.gameover = false;
      state.numberOfMines = BASE_NUMBER;
      state.minefield = GameService.createFilledField();
      state.userField = GameService.createUserField();
    },
  },
});

// Экшены
export const { openCell, setFlag, reboot } = gameSlice.actions;

// Store
export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
