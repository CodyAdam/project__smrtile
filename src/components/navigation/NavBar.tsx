import styles from './NavBar.module.css';
import { NavButton } from './NavButton';

export function NavBar() {
  return (
    <div className={styles.container}>
      <NavButton selected={false}>
        <div className={`icon-extensions`} />
      </NavButton>
      <NavButton selected={true}>
        <div className={`icon-repo`} />
      </NavButton>
      <NavButton selected={false}>
        <div className={`icon-home`} />
      </NavButton>
      <div className={styles.spacer} />
      <NavButton selected={false}>
        <div className={`icon-gear`} />
      </NavButton>
    </div>
  );
}
