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
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
