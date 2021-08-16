import styles from './NavBar.module.css';
import { NavButton } from './NavButton';

export function NavBar() {
  return (
    <div className={styles.container}>
      <NavButton selected={false}>
        <div className={`icon icon-extensions`} />
      </NavButton>
      <NavButton selected={true}>
        <div className={`icon icon-repo`} />
      </NavButton>
      <NavButton selected={false}>
        <div className={`icon icon-home`} />
      </NavButton>
      <div className={styles.spacer} />
      <NavButton selected={false}>
        <div className={`icon icon-gear`} />
      </NavButton>
    </div>
  );
}
