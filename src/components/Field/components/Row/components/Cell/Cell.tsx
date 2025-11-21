import { type FC } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '@/store';
import styles from './cell.module.scss'
import { EUserFieldState } from '@/types';

const cx = classNames.bind(styles);

interface ICellProps {
  row: number;
  column: number;
}

export const Cell: FC<ICellProps> = ({ row, column }) => {
  const userStatus = useAppSelector(state => state.game.userField[row][column]);
  const mineStatus = useAppSelector(state => state.game.minefield[row][column]);

  return (
    <div
      className={cx(styles.cell, {
        [styles.opened]: userStatus === EUserFieldState.OPENED,
        [styles.closed]: userStatus === EUserFieldState.CLOSED,
      })}>
      {mineStatus}
    </div>
  );
};
