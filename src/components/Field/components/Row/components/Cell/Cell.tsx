import { type FC } from 'react';
import classNames from 'classnames';
import { MineIcon, FlagIcon } from '@/components/Icons';
import { useAppSelector, useAppDispatch, openCell, setFlag } from '@/store';
import { EUserFieldState, EFieldState } from '@/types';
import styles from './cell.module.scss';

interface ICellProps {
  row: number;
  column: number;
}

const MOUSE_EVENT = {
  left: 0,
  right: 2,
}

export const Cell: FC<ICellProps> = ({ row, column }) => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(state => state.game.userField[row][column]);
  const mineStatus = useAppSelector(state => state.game.minefield[row][column]);
  const isClosed = [EUserFieldState.CLOSED, EUserFieldState.FLAG].includes(userStatus);
  const isBang = userStatus === EUserFieldState.BANG;
  const isFlag = userStatus === EUserFieldState.FLAG;
  const isNumberInfo = typeof mineStatus === 'number' && !isClosed;

  return (
    <div
      className={classNames(
        styles.cell,
        isClosed && styles.closed,
        isBang && styles.bang,
        isNumberInfo && styles.numberInfo,
        isNumberInfo && styles[`numberInfo-${mineStatus}`],
      )}
      onMouseDown={e => {
        switch (e.button) {
          case MOUSE_EVENT.left:
            dispatch(openCell({ row, column }));
            break;
          case MOUSE_EVENT.right:
            dispatch(setFlag({ row, column }));
            break;
        }
      }}
      onContextMenu={e => e.preventDefault()}>
      {!isClosed && mineStatus === EFieldState.MINE && <MineIcon />}
      {isNumberInfo && mineStatus}
      {isFlag && <FlagIcon />}
    </div>
  );
};
