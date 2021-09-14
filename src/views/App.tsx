import styles from './App.module.css';
import { Explorer } from './creator/explorer/Explorer';
import { EditingHub } from './creator/editing/EditingHub';
import { TopBar } from './creator/topBar/TopBar';
import { NavBar } from '../components/navigation/NavBar';
import { HorizontalSize, ResizeHorizontal } from '../components/resize/Resizable';
import { useState } from 'react';

export default function App() {
  const [explorereSize, setExplorereSize] = useState<HorizontalSize>({ left: 0, right: 0 });

  function handleResize(value: HorizontalSize) {
    if (explorereSize.left !== value.left && explorereSize.right !== value.right) setExplorereSize(value);
  }

  document.oncontextmenu = (e) => {
    e.preventDefault();
  };

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
