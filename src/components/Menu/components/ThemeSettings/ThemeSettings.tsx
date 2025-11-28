import { MoonIcon, SunIcon } from '@/ui/Icons';
import { useAppSelector, useAppDispatch } from '@/store';
import { changeTheme } from '@/store/theme';
import styles from './ThemeSettings.module.scss';


export const ThemeSettings = () => {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);

  return (
    <div
      className={styles.themeBtn}
      onClick={() => dispatch(changeTheme())}
      title="Сменить цветоую тему">
      {isDarkTheme ? <SunIcon /> : <MoonIcon />}
    </div>
  );
}
