import { GridSettings, Sprite, TilesetFilter } from '../../features/browser/browserTypes';
import { useRef, useEffect } from 'react';
import styles from './TilesetPreview.module.css';

export function TilesetPreview({
  sprite,
  grid,
  filters,
  showGrid = true,
}: {
  sprite?: Sprite | undefined;
  grid?: GridSettings;
  filters?: TilesetFilter[];
  showGrid?: boolean;
}) {
  const W = window.innerWidth;
  const H = sprite ? sprite.height * (window.innerWidth / sprite.width) : 0;
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvas.current && grid && sprite) {
      const c = canvas.current.getContext('2d');
      if (c) {
        c.clearRect(0, 0, W, H);
        c.strokeStyle = 'white';
        c.lineWidth = 3;
        for (let col = 1; col < grid.columns; col++) {
          const x = col * (grid.width + grid.offset.left + grid.offset.right) * (W / sprite.width);
          c.beginPath();
          c.moveTo(x, 0);
          c.lineTo(x, H);
          c.stroke();
        }
        for (let row = 1; row < grid.columns; row++) {
          const y = row * (grid.height + grid.offset.top + grid.offset.bottom) * (H / sprite.height);
          c.beginPath();
          c.moveTo(0, y);
          c.lineTo(W, y);
          c.stroke();
        }
        if (grid.offset.bottom !== 0 || grid.offset.left !== 0 || grid.offset.right !== 0 || grid.offset.top !== 0)
          for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.columns; col++) {
              const x =
                (col * (grid.width + grid.offset.left + grid.offset.right) + grid.offset.left) * (W / sprite.width);
              const y =
                (row * (grid.height + grid.offset.top + grid.offset.bottom) + grid.offset.top) * (H / sprite.height);
              const w = grid.width * (W / sprite.width);
              const h = grid.height * (H / sprite.height);
              c.strokeStyle = 'yellow';
              c.strokeRect(x, y, w, h);
            }
          }
      }
    }
  }, [canvas, W, H, sprite, grid]);

  if (sprite) {
    const filterClasses = filters ? (filters.includes('pixelated') ? styles.pixelated : '') : '';
    return (
      <>
        <div className={styles.container}>
          <img className={`${styles.img} ${filterClasses}`} src={sprite.url} alt='' />
          <canvas className={`${styles.canvas} ${showGrid ? '' : styles.disabled}`} ref={canvas} width={W} height={H} />
        </div>
        <div className={styles.sizeLabel}>
          Image size: <b>{sprite.width}</b> x <b>{sprite.height}</b>
        </div>
      </>
    );
  } else
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>There is no tileset to display yet</div>
      </div>
    );
}
