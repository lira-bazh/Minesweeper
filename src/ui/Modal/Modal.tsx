import { type FC, type ReactNode } from 'react';
import classNames from 'classnames';
import { Button } from '@/ui'
import { CloseIcon } from '@/ui/Icons';
import styles from './Modal.module.scss';

interface IModalProps {
  show: boolean;
  close: () => void;
  okAction: () => void;
  title: string;
  children?: ReactNode;
  okBtnText?: string;
  className?: string;
}

export const Modal: FC<IModalProps> = ({ show, close, okAction, title = '', children, okBtnText = 'OK', className }) => {
  return (
    <>
      {show && (
        <>
          <div className={styles.modalOverlay} onClick={close}></div>
          <div className={styles.modal}>
            <div className={styles.closeBtn} onClick={close}>
              <CloseIcon />
            </div>
            <div className={styles.modalHeader}>{title}</div>

            <div className={classNames(styles.modalContent, className)}>{children}</div>

            <div className={styles.modalFooter}>
              <Button
                text={okBtnText}
                onClick={() => {
                  okAction();
                  close();
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
