import styles from './App.module.css';
import { Browser } from '../features/browser/Browser';
import { EditingPanel } from '../features/browser/editingPanel/EditingPanel';
import { TopBar } from '../features/browser/topBar/TopBar';
import { NavBar } from '../features/navigation/NavBar';
import { ResizeHorizontal, ResizeVertical } from '../common/resize/Resizable';

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
