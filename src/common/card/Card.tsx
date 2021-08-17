import { Rule, SmartBrush, AssetTileset } from '../../app/globalTypes';
import styles from './Card.module.css';

export function Card({
  object,
  selected = false,
  onClick,
}: {
  object: Rule | AssetTileset | SmartBrush;
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
