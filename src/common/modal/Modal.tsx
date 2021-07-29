import styles from './Modal.module.css';
import PropTypes from 'prop-types';
export function Modal({
  show,
  onCancel,
  children,
}: {
  show: boolean;
  onCancel: () => void;
  children: PropTypes.ReactElementLike;
}) {
  if (show)
    return (
      <div className={styles.container} onClick={onCancel}>
        <div className={styles.modal}>{children}</div>
      </div>
    );
  else return null;
}
