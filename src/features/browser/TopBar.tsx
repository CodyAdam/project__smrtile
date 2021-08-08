import styles from './TopBar.module.css';
import { SquareButton } from '../../common/squareButton/SquareButton';
import { useAppDispatch } from '../../app/hooks';
import { undo, redo } from '../browser/browserSlice';
import { useAppSelector } from '../../app/hooks';
import { selectedContentSelector } from './browserSlice';

export function TopBar() {
  const selectedContent = useAppSelector(selectedContentSelector);
  const dispatch = useAppDispatch();

  let selectionInfo = null;
  if (selectedContent)
    selectionInfo = (
      <div className={styles.infoContainer}>
        <div>
          <h2>Name</h2>
          <p>{selectedContent.name}</p>
        </div>
        <div>
          <h2>ID</h2>
          <p>{selectedContent.id}</p>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      {selectionInfo}
      <div className={styles.spacer} />

      <SquareButton
        onClick={() => {
          dispatch(undo());
        }}
      >
        <div className={`icon icon-arrow-small-left`} />
      </SquareButton>
      <SquareButton
        onClick={() => {
          dispatch(redo());
        }}
      >
        <div className={`icon icon-arrow-small-right`} />
      </SquareButton>
    </div>
  );
}
