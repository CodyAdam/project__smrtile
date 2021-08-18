import styles from './TilePicker.module.css';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectedContentSelector } from '../explorerSlice';
import { ObjTypes, SmartBrush, Tileset } from '../../../app/globalTypes';

function getImage(selected: Tileset | SmartBrush | undefined | null): HTMLImageElement | null {
  if (!selected || selected.type !== ObjTypes.TILESET || !selected.image) return null;
  const img = new Image();
  img.src = selected.image.url;
  return img;
}

export function TilePicker({ size }: { size: { width: number; height: number } }) {
  const selected = useAppSelector(selectedContentSelector);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = getImage(selected);
    if (img) draw(img);
  }, [canvasRef, size, selected]);

  function draw(img: HTMLImageElement) {
    // INIT
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = canvas;
    const c = canvas.getContext('2d');
    if (!c) return;
    c.clearRect(0, 0, width, height);

    // DRAWING
    const zoomRatio = img.width / width;
    const w = img.width / zoomRatio;
    const h = img.height / zoomRatio;
    c.drawImage(img, 0, 0, w, h);
  }

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} width={Math.max(0, size.width - 20)} height={Math.max(0, size.height - 40 - 20)} />
    </div>
  );
}
