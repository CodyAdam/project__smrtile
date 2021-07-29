import styles from './App.module.css';
import { Browser } from './features/browser/Browser';
import { Toolbar } from './features/toolbar/Toolbar';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.vertical}>
        <Toolbar />
        <div className={styles.horizontal}>
          <Browser />
        </div>
      </div>
    </div>
  );
}

export default App;
