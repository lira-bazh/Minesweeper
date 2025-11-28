import { type FC, useRef } from 'react';
import classNames from 'classnames';
import { MineIcon, FlagIcon } from '@/ui/Icons';
import {
  useAppSelector,
  useAppDispatch,
} from '@/store';
import { openCell, setFlag, pressCell, openAroundCell } from '@/store/game'
import { EUserFieldState, EFieldState } from '@/types';
import styles from './Cell.module.scss';

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
  const isGameOver = useAppSelector(state => state.game.gameover);
  const timerRef = useRef<number | undefined>(undefined);
  const isClosed = [EUserFieldState.CLOSED, EUserFieldState.PRESS, EUserFieldState.FLAG].includes(userStatus);
  const isPress = userStatus === EUserFieldState.PRESS;
  const isBang = userStatus === EUserFieldState.BANG;
  const isFlag = userStatus === EUserFieldState.FLAG;
  const isNumberInfo = typeof mineStatus === 'number' && !isClosed;

  return (
    <div
      className={classNames(
        styles.cell,
        isClosed && styles.closed,
        isPress && styles.press,
        isBang && styles.bang,
        isNumberInfo && styles.numberInfo,
        isNumberInfo && styles[`numberInfo-${mineStatus}`],
        isGameOver && isFlag && mineStatus !== EFieldState.MINE && styles.errorFlag
      )}
      onMouseDown={e => {
        switch (e.button) {
          case MOUSE_EVENT.left:
            if (userStatus === EUserFieldState.CLOSED) {
              dispatch(openCell({ row, column }));
            }

            timerRef.current = setTimeout(() => {
              if (isNumberInfo) {
                dispatch(pressCell({ row, column }));
              }
            }, 300);
            break;
          case MOUSE_EVENT.right:
            dispatch(setFlag({ row, column }));
            break;
        }
      }}
      onMouseUp={() => {
        clearTimeout(timerRef.current);

        if (isNumberInfo) {
          dispatch(openAroundCell({ row, column }));
        }
      }}
      onContextMenu={e => e.preventDefault()}>
      {!isClosed && mineStatus === EFieldState.MINE && <MineIcon />}
      {isNumberInfo && mineStatus}
      {isFlag && <FlagIcon />}
    </div>
  );
};
