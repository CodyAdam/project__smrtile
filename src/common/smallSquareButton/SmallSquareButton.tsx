import styles from './SmallSquareButton.module.css';
import PropTypes from 'prop-types';

export default function SmallSquareButton({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children?: PropTypes.ReactElementLike;
  className?: string;
}) {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
