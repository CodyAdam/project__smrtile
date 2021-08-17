import styles from './EditingHub.module.css';
import { useAppSelector } from '../../../app/hooks';
import { selectedContentSelector } from '../../explorer/explorerSlice';
import { ObjTypes } from '../../../app/globalTypes';
import { TilesetPanel } from './tileset/TilesetPanel';

export function EditingHub() {
  const selected = useAppSelector(selectedContentSelector);

  if (!selected)
    return <div className={`${styles.placeholder}`}>Select an element inside the Browser or add a new element</div>;
  switch (selected.type) {
    case ObjTypes.SMART_BRUSH:
      return (
        <div className={styles.container}>
          <h1>NOT YET IMPLEMENTED</h1>
          <article>
            <h2>Soon</h2>
            <p>Soon</p>
          </article>
        </div>
      );
    case ObjTypes.TILESET:
      return (
        <div className={styles.container}>
          <TilesetPanel key={selected.id} selected={selected} />
        </div>
      );
  }
}
