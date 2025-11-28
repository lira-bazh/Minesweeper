import { useEffect, type ReactNode, type FC } from 'react';
import { useAppSelector } from '@/store';

export interface IThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
  const darkTheme = useAppSelector(state => state.theme.isDarkTheme);

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkTheme]);

  return children;
};
