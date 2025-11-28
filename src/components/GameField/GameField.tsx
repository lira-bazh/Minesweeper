import { Row } from './components';
import { useAppSelector } from '@/store';
import styles from './GameField.module.scss';

export const GameField = () => {
  const fields = useAppSelector(state => state.game.userField);

  return (
    <div className={styles.gameField}>
      {fields.map((item, index) => (
        <Row key={`row-${index}`} row={item} number={index} />
      ))}
    </div>
  );
};
