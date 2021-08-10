import styles from './TextButton.module.css';
import PropTypes from 'prop-types';

export function TextButton({
  onClick,
  title,
  icon,
  invalid = false,
  invalidText,
  children,
  className,
}: {
  onClick?: () => void;
  title: string;
  icon?: string;
  invalid?: boolean;
  invalidText?: string;
  children?: PropTypes.ReactElementLike;
  className?: string;
}) {
  if (icon)
    return (
      <button
        title={invalid && invalidText ? invalidText : title}
        className={`${styles.button} ${className} ${invalid ? styles.invalid : ''}`}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
      >
        <div className={styles.title}>{title}</div>
        {icon ? <div className={`icon icon-${icon}`} /> : null}
      </button>
    );
  else
    return (
      <button
        title={invalid && invalidText ? invalidText : title}
        className={`${styles.button} ${className} ${invalid ? styles.invalid : ''}`}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
      >
        <div className={styles.title}>{title}</div>
        {children}
      </button>
    );
}
