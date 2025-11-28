import { type FC } from 'react'
import { Cell } from './components'
import type { EUserFieldState } from '@/types';
import syles from './Row.module.scss'

interface IRowProps {
  row: EUserFieldState[];
  number: number;
}

export const Row: FC<IRowProps> = ({ row, number }) => {
  return (
    <div className={syles.row}>
      {row.map((_, index) => (
        <Cell key={`cell-${number}-${index}`} row={number} column={index} />
      ))}
    </div>
  );
};
