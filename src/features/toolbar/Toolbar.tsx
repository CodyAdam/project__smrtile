import styles from './Toolbar.module.css';
import SmallSquareButton from '../../common/smallSquareButton/SmallSquareButton';
import { useAppDispatch } from '../../app/hooks';
import { undo, redo } from '../browser/browserSlice';

export function Toolbar() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.spacer} />

      <SmallSquareButton
        onClick={() => {
          dispatch(undo());
        }}
      >
        <div className={`icon icon-arrow-small-left`} />
      </SmallSquareButton>
      <SmallSquareButton
        onClick={() => {
          dispatch(redo());
        }}
      >
        <div className={`icon icon-arrow-small-right`} />
      </SmallSquareButton>
    </div>
  );
}
