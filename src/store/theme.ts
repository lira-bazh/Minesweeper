import { createSlice } from "@reduxjs/toolkit";
import { ThemeService } from '@/services/theme';

export interface IThemeSlice {
  isDarkTheme: boolean;
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkTheme: ThemeService.getSavedTheme(),
  } as IThemeSlice,
  reducers: {
    changeTheme: state => {
      state.isDarkTheme = !state.isDarkTheme;
      ThemeService.saveTheme(state.isDarkTheme);
    },
  },
});

export const { changeTheme } = themeSlice.actions;