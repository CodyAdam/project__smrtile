import styles from './App.module.css';
import { Explorer } from '../features/creator/explorer/Explorer';
import { EditingHub } from '../features/creator/editing/EditingHub';
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
              <Explorer></Explorer>
              <EditingHub></EditingHub>
            </ResizeHorizontal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
