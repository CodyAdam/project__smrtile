import styles from './TextButton.module.css';

export function TextButton({
  onClick,
  title,
  icon,
  highlight = false,
  invalid = false,
  invalidText,
  children,
  className,
}: {
  onClick?: () => void;
  title: string;
  icon?: string;
  highlight?: boolean;
  invalid?: boolean;
  invalidText?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      title={invalid && invalidText ? invalidText : title}
      className={` ${className} ${styles.button} ${invalid ? styles.invalid : ''} ${highlight ? styles.highlight : ''}`}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (onClick && !invalid) onClick();
      }}
    >
      <div>{title}</div>
      {icon ? <div className={`icon-${icon}`} /> : children}
    </button>
  );
}
