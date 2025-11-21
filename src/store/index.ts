import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { configureStore, createSlice, type Slice } from '@reduxjs/toolkit';
import { GameService } from '@/services/game';
import { BASE_NUMBER } from '@/constants';
import type { EUserFieldState, TFieldState } from '@/types';

export interface IGameSlice {
  size: number;
  minefield: TFieldState[][];
  userField: EUserFieldState[][];
}

const gameSlice: Slice<IGameSlice> = createSlice({
  name: 'playingField',
  initialState: { size: BASE_NUMBER, minefield: GameService.createFilledField(), userField: GameService.createUserField() },
  reducers: {
    // increment: state => {
    //   state.value += 1;
    // },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Экшены
// export const { increment, decrement, incrementByAmount } = mineSlice.actions;

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
