import styles from './Editing.module.css';
import { useAppSelector } from '../../../redux/hooks';
import { selectedContentSelector } from '../../../redux/explorerSlice';
import { Types } from '../../../types/general';
import { TilesetPanel } from './TilesetPanel';

export function EditingHub() {
  const selected = useAppSelector(selectedContentSelector);

  if (!selected)
    return <div className={`${styles.placeholder}`}>Select an element inside the Browser or add a new element</div>;
  switch (selected.type) {
    case Types.BRUSH:
      return <div className={styles.container}>nothing</div>;
    case Types.TILESET:
      return <TilesetPanel key={selected.id} selected={selected} />;
  }
}
