import styles from './NavBar.module.css';
import { Svg } from '../../common/svg/Svg';
export function NavBar() {
  return (
    <div className={styles.container}>
      <Svg name='star' className={styles.svg} />
    </div>
  );
}
