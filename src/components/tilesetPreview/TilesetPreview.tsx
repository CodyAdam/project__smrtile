import { GridSettings, ImageData, TilesetFilter } from '../../types/general';
import { useRef, useEffect, useState } from 'react';
import styles from './TilesetPreview.module.css';

export function TilesetPreview({
  sprite,
  grid,
  filters,
  showGrid = true,
}: {
  sprite?: ImageData | undefined;
  grid?: GridSettings;
  filters?: TilesetFilter[];
  showGrid?: boolean;
}) {
  let [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const W = window.innerWidth;
  const H = sprite ? sprite.height * (window.innerWidth / sprite.width) : 0;
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvas.current && grid && sprite) {
      const c = canvas.current.getContext('2d');
      if (c) {
        c.clearRect(0, 0, W, H);
        c.strokeStyle = 'white';

        c.globalAlpha = 0.4;
        c.lineWidth = 3;
        for (let col = 1; col < grid.columns; col++) {
          const x = col * (grid.width + grid.offset.left + grid.offset.right) * (W / sprite.width);
          c.beginPath();
          c.moveTo(x, 0);
          c.lineTo(x, H);
          c.stroke();
        }
        for (let row = 1; row < grid.rows; row++) {
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

              c.globalAlpha = 0.6;
              c.strokeStyle = 'yellow';
              c.strokeRect(x, y, w, h);
            }
          }
        c.globalAlpha = 1;
        if (mousePos) {
          // draw on mouse
          const w = (grid.width + grid.offset.left + grid.offset.right) * (W / sprite.width);
          const h = (grid.height + grid.offset.top + grid.offset.bottom) * (H / sprite.height);
          const x = mousePos.x * W - ((mousePos.x * W) % w);
          const y = mousePos.y * H - ((mousePos.y * H) % h);
          const row = Math.round(y / h);
          const col = Math.round(x / w);
          c.strokeStyle = 'white';
          c.lineWidth = 5;
          c.strokeRect(x, y, w, h);
          c.fillStyle = 'white';
          c.font = '30px Segoe UI, sans-serif';
          c.fillText(`x: ${col} y: ${row}`, x + 10, y + 30);
        }
      }
    }
  }, [canvas, W, H, sprite, grid, mousePos]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.x) / rect.width, y: (e.clientY - rect.y) / rect.height });
  }
  function handleMouseLeave(e: React.MouseEvent) {
    setMousePos(null);
  }

  if (sprite) {
    const filterClasses = filters ? (filters.includes('pixelated') ? styles.pixelated : '') : '';
    return (
      <div className={styles.container}>
        <img className={`${styles.img} ${filterClasses}`} src={sprite.url} alt='' />
        <canvas
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`${styles.canvas} ${showGrid ? '' : styles.disabled}`}
          ref={canvas}
          width={W}
          height={H}
        />
      </div>
    );
  } else
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>There is no tileset to display yet</div>
      </div>
    );
}
