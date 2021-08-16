import styles from './NavButton.module.css';
import PropType from 'prop-types';

export function NavButton({ children, selected }: { children: PropType.ReactElementLike; selected: boolean }) {
  return <button className={` ${selected ? ' ' + styles.selected : ''} ${styles.button}`}>{children}</button>;
}
