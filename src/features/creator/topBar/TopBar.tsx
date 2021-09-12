import styles from './TopBar.module.css';
import { SquareButton } from '../../../common/squareButton/SquareButton';
import { useAppDispatch } from '../../../app/hooks';
import { undo, redo } from '../explorer/explorerSlice';
import { useAppSelector } from '../../../app/hooks';
import { selectedContentSelector } from '../explorer/explorerSlice';
import { pickedSelector, pickedTilesetContentSelector } from '../picker/pickerSlice';

export function TopBar() {
  const selectedContent = useAppSelector(selectedContentSelector);
  const pickedTile = useAppSelector(pickedSelector);
  const pickedTileset = useAppSelector(pickedTilesetContentSelector);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      {selectedContent ? (
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
      ) : null}
      {pickedTile && pickedTileset ? (
        <div className={styles.infoContainer}>
          <div>
            <h2>Picked Name</h2>
            <p>{pickedTile.name}</p>
          </div>
          <div>
            <h2>Tileset</h2>
            <p>{pickedTileset.name}</p>
          </div>
        </div>
      ) : null}
      <div className={styles.spacer} />

      <SquareButton
        title='undo'
        onClick={() => {
          dispatch(undo());
        }}
        icon='arrow-small-left'
      />
      <SquareButton
        title='redo'
        onClick={() => {
          dispatch(redo());
        }}
        icon='arrow-small-right'
      />
    </div>
  );
}
