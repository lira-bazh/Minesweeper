import classNames from 'classnames';
import { FieldSettings, ThemeSettings, EmojiIcon } from './components';
import { useAppSelector} from '@/store';
import styles from './Menu.module.scss';

export const Menu = () => {
  const numberOfMines = useAppSelector(state => state.game.numberOfMines);

  return (
    <div className={styles.menu}>
      <div className={styles.counter}>{numberOfMines.toString().padStart(3, '0')}</div>
      <div className={classNames(styles.emoji, styles.icons)}>
        <EmojiIcon />
      </div>
      <div className={classNames(styles.settings, styles.icons)}>
        <ThemeSettings />
        <FieldSettings />
      </div>
    </div>
  );
};
