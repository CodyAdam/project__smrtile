import styles from './Explorer.module.css';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { select, selectedContentSelector, selectedSelector } from './explorerSlice';
import { ObjTypes, SmartBrush, Tileset, Vector2 } from '../../app/globalTypes';
import { SquareButton } from '../../common/squareButton/SquareButton';

function getImage(selected: Tileset | SmartBrush | undefined | null): HTMLImageElement | null {
  if (!selected || selected.type !== ObjTypes.TILESET || !selected.image) return null;
  const img = new Image();
  img.src = selected.image.url;
  return img;
}

const ZOOM_INCREMENT = 0.2;

export function TilePicker({ size }: { size: { width: number; height: number } }) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedSelector);
  const picked = useAppSelector(selectedContentSelector);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showGrid, setShowGrid] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [zoom, setZoom] = useState<null | number>(null);
  const [offset, setOffset] = useState<Vector2>({ x: 0, y: 0 });

  useEffect(() => {
    // INIT
    const img = getImage(picked);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = canvas;
    const c = canvas.getContext('2d');
    if (!c) return;
    if (!img) {
      c.clearRect(0, 0, width, height);
      return;
    }
    if (picked && picked.type === ObjTypes.TILESET && picked.filters.includes('pixelated'))
      c.imageSmoothingEnabled = false;
    else c.imageSmoothingEnabled = true;

    // DRAWING IMG
    img.onload = () => {
      c.clearRect(0, 0, width, height);
      if (!zoom) {
        setZoom(Math.max(img.width / width, img.height / height));
      } else {
        const w = img.width / zoom;
        const h = img.height / zoom;
        const x = offset.x + (w - width) / -2;
        const y = offset.y + (h - height) / -2;
        c.drawImage(img, x, y, w, h);
      }
    };
  }, [canvasRef, size, picked, zoom, offset]);

  function handleWheel(e: React.WheelEvent) {
    if (zoom) setZoom(e.deltaY > 0 ? zoom * (1 + ZOOM_INCREMENT) : zoom * (1 - ZOOM_INCREMENT));
  }
  let startPos: Vector2 = { x: 0, y: 0 };
  function handleMouseDown(e: React.MouseEvent) {
    if (e.button === 1) {
      //MIDDLE CLICK
      startPos = { x: e.clientX, y: e.clientY };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
    }
  }
  function handleMouseMove(e: MouseEvent) {
    const x = offset.x + (e.clientX - startPos.x);
    const y = offset.y + (e.clientY - startPos.y);
    setOffset({ x: x, y: y });
  }
  function handleMouseUp(e: MouseEvent) {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'default';
  }

  if (picked && picked.type === ObjTypes.TILESET && picked.image)
    return (
      <>
        <div className={styles.title}>
          <span>TILE PICKER</span>
          <SquareButton
            icon='info'
            isActive={showControls}
            onClick={() => {
              setShowControls(!showControls);
            }}
            title='show controls'
          />
          <SquareButton
            icon='symbol-numeric'
            isActive={showGrid}
            onClick={() => {
              setShowGrid(!showGrid);
            }}
            title='show grid'
          />
          <SquareButton
            icon='edit'
            onClick={() => {
              if ((!selected && picked) || (selected && picked && selected.id !== picked.id))
                dispatch(select({ type: ObjTypes.TILESET, id: picked.id }));
            }}
            title='edit tileset'
          />
          <SquareButton
            icon='debug-restart'
            onClick={() => {
              setOffset({ x: 0, y: 0 });
              setZoom(null);
            }}
            title='reset zoom'
          />
        </div>

        <div className={styles.canvasContainer}>
          <canvas
            ref={canvasRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            className={styles.canvas}
            width={Math.max(0, size.width - 20)}
            height={Math.max(0, size.height - 40 - 10)}
          />
          {showControls ? (
            <div className={styles.controls}>
              <p className='icon icon-info' />
              <p>TODO</p>
              <p>{`middle -> pan the viewport`}</p>
              <p>{`left -> pick a tile`}</p>
            </div>
          ) : null}
        </div>
      </>
    );
  else
    return (
      <>
        <div className={styles.title}>
          <span>TILE PICKER</span>
        </div>
        <div className={styles.placeholder}>
          {picked && picked.type === ObjTypes.TILESET && !picked.image
            ? 'The selected tileset has no image'
            : 'Select a tileset using right click'}
        </div>
      </>
    );
}
