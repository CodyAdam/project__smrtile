import styles from './IconButton.module.css';
import PropTypes from 'prop-types';

export function IconButton({
  onClick,
  children,
  className,
}: {
  onClick?: () => void;
  children?: PropTypes.ReactElementLike;
  className?: string;
}) {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}
