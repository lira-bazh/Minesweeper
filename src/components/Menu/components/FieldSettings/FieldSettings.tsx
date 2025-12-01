import { useEffect, useState } from 'react';
import { SettingsIcon } from '@/ui/Icons';
import { Modal, Input } from '@/ui';
import { useAppSelector, useAppDispatch } from '@/store';
import { changeUserSettings } from '@/store/game';
import styles from './FieldSettings.module.scss';

export const FieldSettings = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const userSettingsSize = useAppSelector(state => state.game.size);
  const userSettingsMines = useAppSelector(state => state.game.startNumberOfMines);
  const [fieldSize, setFieldSize] = useState(userSettingsSize.toString());
  const [numberOfMines, setNumberOfMines] = useState(userSettingsMines.toString());

  useEffect(() => {
    setFieldSize(userSettingsSize.toString());
  }, [userSettingsSize]);

  useEffect(() => {
    setNumberOfMines(userSettingsMines.toString());
  }, [userSettingsMines]);

  return (
    <>
      <div
        className={styles.fieldSettingsBtn}
        title="Настройки поля"
        onClick={() => setShowModal(true)}>
        <SettingsIcon />
      </div>
      <Modal
        title="Настройки поля"
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        okAction={() => {
          dispatch(
            changeUserSettings({ size: Number(fieldSize), numMines: Number(numberOfMines) }),
          );
        }}
        okBtnText="Применить и перезапустить игру"
        className={styles.fieldSettingsModal}>
        <Input
          name="fieldSize"
          label="Размер поля"
          type="number"
          value={fieldSize.toString()}
          validation={value => {
            if (isNaN(Number(value))) {
              return 'Размер поля должен быть числом';
            } else if (Number(value) <= 1) {
              return 'Размер поля должен быть больше 1';
            } else if (Number(value) > 24) {
              return 'Размер поля должен быть меньше 25';
            } else if (Number(value) * Number(value) < Number(numberOfMines)) {
              return 'Количество мин должно быть меньше количества клеток';
            }

            return '';
          }}
          onChange={value => {
            setFieldSize(value);
          }}
        />
        <Input
          name="numberOfMines"
          label="Количество мин"
          type="number"
          value={numberOfMines.toString()}
          validation={value => {
            if (isNaN(Number(value))) {
              return 'Количество мин должно быть числом';
            } else if (Number(value) < 1) {
              return 'Количество мин должно быть больше 0';
            } else if (Number(fieldSize) * Number(fieldSize) < Number(value)) {
              return 'Количество мин должно быть меньше количества клеток';
            }

            return '';
          }}
          onChange={value => setNumberOfMines(value)}
        />
      </Modal>
    </>
  );
};
