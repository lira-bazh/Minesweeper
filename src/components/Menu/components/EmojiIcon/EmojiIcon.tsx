import { EmojiSmileIcon, EmojiDeathIcon, LikeIcon } from '@/ui/Icons';
import { useAppSelector, useAppDispatch } from '@/store';
import { reboot } from '@/store/game';
import styles from './EmojiIcon.module.scss';

export const EmojiIcon = () => {
  const dispatch = useAppDispatch();
  const isGame = useAppSelector(state => !state.game.gameover);
  const isWin = useAppSelector(state => state.game.gameover && !state.game.numberOfMines);

  return (
    <div className={styles.emojiIcon} onClick={() => dispatch(reboot())} title="Перезапустить игру">
      {isGame && <EmojiSmileIcon />}
      {!isGame && (isWin ? <LikeIcon /> : <EmojiDeathIcon />)}
    </div>
  );
}
