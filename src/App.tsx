import styles from './App.module.css';
import { Browser } from './features/browser/Browser';
import { EditingPanel } from './features/browser/EditingPanel';
import { Toolbar } from './features/toolbar/Toolbar';
import { NavBar } from './features/navigation/NavBar';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.horizontal}>
        <NavBar />
        <div className={styles.vertical}>
          <Toolbar />
          <div className={styles.horizontal}>
            <Browser />
            <EditingPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
