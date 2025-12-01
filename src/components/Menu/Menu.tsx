import classNames from 'classnames';
import { FieldSettings, ThemeSettings, EmojiIcon } from './components';
import { useAppSelector} from '@/store';
import styles from './Menu.module.scss';

export const Menu = () => {
  const numberOfFlags = useAppSelector(state => state.game.numberOfFlags);

  return (
    <div className={styles.menu}>
      <div className={styles.counter}>{numberOfFlags.toString().padStart(3, '0')}</div>
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
