import { type FC } from 'react'
import classNames from 'classnames';
import styles from './Button.module.scss';

interface IButtonProps {
  className?: string;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: FC<IButtonProps> = ({ className, text, onClick, disabled }) => {
  return (
    <button
      className={classNames(styles.customButton, className)}
      onClick={() => onClick()}
      disabled={disabled}>
      {text}
    </button>
  );
};
