import styles from './App.module.css';
import { Explorer } from '../features/explorer/Explorer';
import { EditingHub } from '../features/creator/editing/EditingHub';
import { TopBar } from '../features/creator/topBar/TopBar';
import { NavBar } from '../common/navigation/NavBar';
import { HorizontalSize, ResizeHorizontal } from '../common/resize/Resizable';
import { useState } from 'react';

function App() {
  const [explorereSize, setExplorereSize] = useState<HorizontalSize>({ left: 0, right: 0 });
  function handleResize(value: HorizontalSize) {
    setExplorereSize(value);
  }
  return (
    <div className={`${styles.app} ${styles.horizontal}`}>
      <NavBar />
      <div className={styles.vertical}>
        <TopBar />
        <ResizeHorizontal init={30} min={2} max={98} onResize={handleResize} className={styles.horizontal}>
          <Explorer horizontalSize={explorereSize}></Explorer>
          <EditingHub></EditingHub>
        </ResizeHorizontal>
      </div>
    </div>
  );
}

export default App;
