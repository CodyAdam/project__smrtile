import { useState } from 'react';
import styles from './BrowsingGroup.module.css';
import PropsType from 'prop-types';
import { SquareButton } from '../squareButton/SquareButton';

export function BrowsingGroup({
  title,
  children,
  onAdd,
}: {
  title: string;
  children?: PropsType.ReactElementLike;
  onAdd: () => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <button
          className={styles.expandButton}
          onClick={() => {
            setShow(!show);
          }}
        >
          <div className={`${styles.expandIcon} ${show ? 'icon-chevron-down' : 'icon-chevron-right'} icon`} />
          <div className={styles.title}>{title.toUpperCase()}</div>
        </button>
        <SquareButton title='add' onClick={onAdd} icon='add' />
      </div>
      <div className={styles.groupContent} hidden={!show || !children}>
        {children}
      </div>
    </div>
  );
}
