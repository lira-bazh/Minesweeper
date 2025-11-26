import classNames from 'classnames';
import {
  SettingsIcon,
  EmojiSmileIcon,
  EmojiDeathIcon,
  SunIcon,
  LikeIcon,
  MoonIcon,
} from '@/components/Icons';
import { useAppSelector, useAppDispatch, reboot, changeTheme } from '@/store';
import styles from './menu.module.scss';

export const Menu = () => {
  const dispatch = useAppDispatch();
  const numberOfMines = useAppSelector(state => state.game.numberOfMines);
  const isGame = useAppSelector(state => !state.game.gameover);
  const isWin = useAppSelector(state => state.game.gameover && !state.game.numberOfMines);
  const isDarkTheme = useAppSelector(state => state.game.isDarkTheme);

  return (
    <div className={styles.menu}>
      <div className={styles.counter}>{numberOfMines.toString().padStart(3, '0')}</div>
      <div className={classNames(styles.emoji, styles.icons)}>
        <div
          className={styles.emojiIcon}
          onClick={() => dispatch(reboot())}
          title="Перезапустить игру">
          {isGame && <EmojiSmileIcon />}
          {!isGame && (isWin ? <LikeIcon /> : <EmojiDeathIcon />)}
        </div>
      </div>
      <div
        className={classNames(styles.settings, styles.icons)}
        onClick={() => dispatch(changeTheme())}>
        <div className={styles.themeBtn} title="Сменить цветоую тему">
          {isDarkTheme ? <SunIcon /> : <MoonIcon />}
        </div>
        <div className={styles.settingsBtn} title="Настройки поля">
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};
