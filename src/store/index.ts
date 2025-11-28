import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { themeSlice } from './theme';
import { gameSlice } from './game';

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    theme: themeSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
