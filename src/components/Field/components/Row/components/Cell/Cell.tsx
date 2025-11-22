import { type FC } from 'react';
import classNames from 'classnames';
import { Mine } from '@/components/Icons';
import { useAppSelector, useAppDispatch, openCell } from '@/store';
import { EUserFieldState, EFieldState } from '@/types';
import styles from './cell.module.scss';

interface ICellProps {
  row: number;
  column: number;
}

export const Cell: FC<ICellProps> = ({ row, column }) => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(state => state.game.userField[row][column]);
  const mineStatus = useAppSelector(state => state.game.minefield[row][column]);
  const isClosed = userStatus === EUserFieldState.CLOSED;
  const isBang = userStatus === EUserFieldState.BANG;
  const isNumberInfo = typeof mineStatus === 'number';

  return (
    <div
      className={classNames(
        styles.cell,
        isClosed && styles.closed,
        isBang && styles.bang,
        isNumberInfo && styles.numberInfo,
        isNumberInfo && styles[`numberInfo-${mineStatus}`],
      )}
      onClick={() => dispatch(openCell({ row, column }))}>
      {mineStatus === EFieldState.MINE && !isClosed && <Mine />}
      {isNumberInfo && !isClosed && mineStatus}
    </div>
  );
};
