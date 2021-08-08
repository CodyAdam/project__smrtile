import styles from './SquareButton.module.css';
import PropTypes from 'prop-types';

export function SquareButton({
  onClick,
  children,
  className,
  title,
}: {
  onClick?: () => void;
  children?: PropTypes.ReactElementLike;
  className?: string;
  title?: string;
}) {
  return (
    <button
      title={title}
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
