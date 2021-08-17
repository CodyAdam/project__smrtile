import { useState, useRef } from 'react';
import styles from './BrowsingGroup.module.css';
import { SquareButton } from '../../../common/squareButton/SquareButton';

export function BrowsingGroup({
  title,
  children,
  onAdd,
}: {
  title: string;
  children?: React.ReactNode;
  onAdd: () => void;
}) {
  const label = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  return (
    <div className={styles.container}>
      <div ref={label} className={styles.label}>
        <button
          className={styles.expandButton}
          onClick={() => {
            setShow(!show);
          }}
          onFocus={() => {
            if (label.current) label.current.style.border = '1px solid var(--txt1)';
          }}
          onBlur={() => {
            if (label.current) label.current.style.border = '1px solid transparent';
          }}
        >
          <div className={`${styles.expandIcon} ${show ? 'icon-chevron-down' : 'icon-chevron-right'} icon`} />
          <div className={styles.title}>{title.toUpperCase()}</div>
        </button>
        <SquareButton
          title='add'
          onClick={() => {
            setShow(true);
            onAdd();
          }}
          icon='add'
        />
      </div>
      <div className={styles.groupContent} hidden={!show || !children || !(Array.isArray(children) && children.length)}>
        {children}
      </div>
    </div>
  );
}
