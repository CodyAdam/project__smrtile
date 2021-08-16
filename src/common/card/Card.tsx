import { Rule, SmartTile, Tileset } from '../../app/globalTypes';
import styles from './Card.module.css';

export function Card({
  object,
  selected = false,
  onClick,
}: {
  object: Rule | Tileset | SmartTile;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={`${styles.container} ${selected ? styles.selected : ''} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
    >
      {object.name.substring(0, 2).toUpperCase()}
    </div>
  );
}
