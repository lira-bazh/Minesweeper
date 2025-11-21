// import React from 'react'
import { Row } from './components';
import { useAppSelector } from '@/store';

export const Field = () => {
  const fields = useAppSelector(state => state.game.userField);

  return (
    <div>
      {fields.map((item, index) => (
        <Row key={`row-${index}`} row={item} number={index} />
      ))}
    </div>
  );
}
