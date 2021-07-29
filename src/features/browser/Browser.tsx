import styles from './Browser.module.css';
import { TilesetCreation } from './TilesetCreation';

export function Browser() {
  return (
    <>
      <div className={styles.container}>
        <h1>BROWSER</h1>
        <h2>RULES</h2>
        <h2>BRUSHES</h2>
        <h2>TILESETS</h2>
        <TilesetCreation />
      </div>
      <div className={styles.resizeBar}></div>
    </>
  );
}
