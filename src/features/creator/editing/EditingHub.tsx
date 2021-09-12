import styles from './Editing.module.css';
import { useAppSelector } from '../../../app/hooks';
import { selectedContentSelector } from '../explorer/explorerSlice';
import { ObjTypes } from '../../../types/globalTypes';
import { TilesetPanel } from './TilesetPanel';

export function EditingHub() {
  const selected = useAppSelector(selectedContentSelector);

  if (!selected)
    return <div className={`${styles.placeholder}`}>Select an element inside the Browser or add a new element</div>;
  switch (selected.type) {
    case ObjTypes.SMART_BRUSH:
      return <div className={styles.container}>nothing</div>;
    case ObjTypes.TILESET:
      return <TilesetPanel key={selected.id} selected={selected} />;
  }
}
