import { Rule, SmartBrush, Tileset } from '../../../../types/globalTypes';
import styles from './Card.module.css';

export function Card({
  object,
  isSelected = false,
  onClick,
  onAltClick,
}: {
  object: Rule | Tileset | SmartBrush;
  isSelected?: boolean;
  onClick?: () => void;
  onAltClick?: () => void;
}) {
  return (
    <div
      className={`${styles.container} ${isSelected ? styles.selected : ''} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
      onMouseDown={(e) => {
        if ((e.button === 2 || e.button === 1) && onAltClick) {
          e.preventDefault();
          onAltClick();
        }
      }}
      onDoubleClick={onAltClick}
    >
      {object.name.substring(0, 2).toUpperCase()}
    </div>
  );
}
