import styles from './SmallSquareButton.module.css';
import PropTypes from 'prop-types';

export default function SmallSquareButton({
  onClick,
  children,
  className,
}: {
  onClick?: () => void;
  children?: PropTypes.ReactElementLike;
  className?: string;
}) {
  return (
    <div
      className={`${styles.button} ${className}`}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
