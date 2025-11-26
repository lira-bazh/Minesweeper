import classNames from 'classnames';
import {
  SettingsIcon,
  EmojiSmileIcon,
  EmojiDeathIcon,
  SunIcon,
  LikeIcon,
} from '@/components/Icons';
import { useAppSelector, useAppDispatch, reboot } from '@/store';
import styles from './menu.module.scss';

export const Menu = () => {
  const dispatch = useAppDispatch();
  const numberOfMines = useAppSelector(state => state.game.numberOfMines);
  const isGame = useAppSelector(state => !state.game.gameover);
  const isWin = useAppSelector(state => state.game.gameover && !state.game.numberOfMines);

  return (
    <div className={styles.menu}>
      <div className={styles.counter}>{numberOfMines.toString().padStart(3, '0')}</div>
      <div className={classNames(styles.emoji, styles.icons)}>
        <div className={styles.emojiIcon} onClick={() => dispatch(reboot())}>
          {isGame && <EmojiSmileIcon />}
          {!isGame && (isWin ? <LikeIcon /> : <EmojiDeathIcon />)}
        </div>
      </div>
      <div className={classNames(styles.settings, styles.icons)}>
        <div className={styles.themeIcon}>
          <SunIcon />
        </div>
        <SettingsIcon />
      </div>
    </div>
  );
};
