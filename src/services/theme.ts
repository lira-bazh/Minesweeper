const DARK_THEME = 'darkTheme';

export const ThemeService = {
  saveTheme(theme: boolean) {
    localStorage?.setItem(DARK_THEME, String(theme));
  },
  getSavedTheme() {
    return (
      localStorage?.getItem(DARK_THEME) ??
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }
};