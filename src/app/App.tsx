import styles from './App.module.css';
import { Browser } from '../features/creator/explorer/Explorer';
import { EditingPanel } from '../features/creator/editing/EditingPanel';
import { TopBar } from '../features/creator/topBar/TopBar';
import { NavBar } from '../common/navigation/NavBar';
import { ResizeHorizontal } from '../common/resize/Resizable';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.horizontal}>
        <NavBar />
        <div className={styles.vertical}>
          <TopBar />
          <div className={styles.horizontal}>
            <ResizeHorizontal min={2} max={98}>
              <Browser></Browser>
              <EditingPanel></EditingPanel>
            </ResizeHorizontal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
