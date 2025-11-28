import { type FC, useState } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface IInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: 'text' | 'number';
  validation?: (value: string) => string;
}

export const Input: FC<IInputProps> = ({ label, name, value, validation, onChange, className, type = 'text' }) => {
  const [error, setError] = useState('');
  return (
    <div className={className}>
      <label className={styles.customLabel}>
        {label}
        <input
          name={name}
          pattern={type == 'number' ? '[0-9]*' : undefined}
          className={classNames(styles.customInput, error && styles.invalidInput)}
          value={value}
          onChange={e => {
            if (typeof validation === 'function') {
              setError(validation(e.target.value));
            }

            onChange(e.target.value);
          }}
        />
      </label>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
