import { GameField, Menu } from '@/components';
import styles from './MainPage.module.scss'

export const MainPage = () => {
  return (
    <div className={styles.mainPageWrapper}>
      <div className={styles.mainPage}>
        <Menu />
        <GameField />
      </div>
    </div>
  );
}
