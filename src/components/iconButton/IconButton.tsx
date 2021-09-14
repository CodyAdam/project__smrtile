import styles from './IconButton.module.css';

export function IconButton({
  onClick,
  children,
  className,
  title,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  title: string;
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
