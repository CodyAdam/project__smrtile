import styles from './SquareButton.module.css';

export function SquareButton({
  onClick,
  icon,
  children,
  className,
  title,
}: {
  onClick?: () => void;
  icon?: string;
  children?: React.ReactNode;
  className?: string;
  title: string;
}) {
  if (icon)
    return (
      <button
        title={title}
        className={`${styles.button} ${className}`}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
      >
        {icon ? <div className={`icon icon-${icon}`} /> : null}
      </button>
    );
  else
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
