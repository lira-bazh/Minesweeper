import { Field, Menu } from '@/components'
import styles from './mainPage.module.scss'

export const MainPage = () => {
  return (
    <div className={styles.mainPageWrapper}>
      <div className={styles.mainPage}>
        <Menu />
        <Field />
      </div>
    </div>
  );
}
