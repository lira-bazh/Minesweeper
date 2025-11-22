import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { configureStore, createSlice, type Slice } from '@reduxjs/toolkit';
import { GameService } from '@/services/game';
import { BASE_NUMBER } from '@/constants';
import { EUserFieldState, type TFieldState } from '@/types';

export interface IGameSlice {
  size: number;
  minefield: TFieldState[][];
  userField: EUserFieldState[][];
}

const gameSlice: Slice<IGameSlice> = createSlice({
  name: 'playingField',
  initialState: { size: BASE_NUMBER, minefield: GameService.createFilledField(), userField: GameService.createUserField() },
  reducers: {
    openCell: (state, action) => {
      const { row, column } = action.payload;
      state = GameService.openCell(row, column, state);
    }
  },
});

// Экшены
export const { openCell } = gameSlice.actions;

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
