import { Rule, SmartBrush, Tileset } from '../../../app/globalTypes';
import styles from './Card.module.css';

export function Card({
  object,
  isSelected = false,
  onClick,
}: {
  object: Rule | Tileset | SmartBrush;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={`${styles.container} ${isSelected ? styles.selected : ''} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
    >
      {object.name.substring(0, 2).toUpperCase()}
    </div>
  );
}
