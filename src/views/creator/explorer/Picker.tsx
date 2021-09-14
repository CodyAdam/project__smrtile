import styles from './Explorer.module.css';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { select, selectedSelector } from '../../../redux/explorerSlice';
import { Types, Tile, Vector2 } from '../../../types/general';
import { Tileset } from '../../../types/tileset';
import { SquareButton } from '../../../components/squareButton/SquareButton';
import { pick, pickedTileSelector, pickedTilesetContentSelector, unpick } from '../../../redux/pickerSlice';
import { getImage } from '../../../utils/helper';

const ZOOM_INCREMENT = 0.2;

export function Picker({ size }: { size: { width: number; height: number } }) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedSelector);
  const tileset: Tileset | undefined = useAppSelector(pickedTilesetContentSelector);
  const tile: Tile | null = useAppSelector(pickedTileSelector);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showGrid, setShowGrid] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [zoom, setZoom] = useState<null | number>(null);
  const [offset, setOffset] = useState<Vector2>({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState<Vector2>({ x: 0, y: 0 });
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  let startPos: Vector2 = { x: 0, y: 0 };

  useEffect(() => {
    const img = getImage(tileset);
    if (img)
      img.onload = () => {
        setImage(img);
      };
  }, [tileset]);

  useEffect(() => {
    // INIT
    const img = image;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = canvas;
    const c = canvas.getContext('2d');
    if (!c) return;
    if (!img || !tileset || !tileset.image) {
      c.clearRect(0, 0, width, height);
      return;
    }
    if (tileset.filters.includes('pixelated')) c.imageSmoothingEnabled = false;
    else c.imageSmoothingEnabled = true;

    // DRAWING IMG
    c.clearRect(0, 0, width, height);
    if (!zoom) {
      setZoom(Math.max(img.width / width, img.height / height));
      return;
    }

    const imgW = img.width / zoom;
    const imgH = img.height / zoom;
    const imgX = offset.x + (imgW - width) / -2;
    const imgY = offset.y + (imgH - height) / -2;
    c.drawImage(img, imgX, imgY, imgW, imgH);

    // DRAW GRID
    const grid = tileset.grid;
    if (showGrid) {
      //OFFSET GRID
      c.globalAlpha = 0.2;
      c.lineWidth = 1;
      c.strokeStyle = 'yellow';
      if (grid.offset)
        for (let row = 0; row < grid.rows; row++)
          for (let col = 0; col < grid.columns; col++) {
            const offX = imgX + (col * (grid.width + grid.offset.left + grid.offset.right) + grid.offset.left) / zoom;
            const offY = imgY + (row * (grid.height + grid.offset.top + grid.offset.bottom) + grid.offset.top) / zoom;
            c.strokeRect(offX, offY, grid.width / zoom, grid.height / zoom);
          }

      // GRID
      c.strokeStyle = 'white';
      c.globalAlpha = 0.8;
      c.lineWidth = 1;
      for (let col = 0; col <= grid.columns; col++) {
        const gridX = imgX + (col * (grid.width + grid.offset.left + grid.offset.right)) / zoom;
        c.beginPath();
        c.moveTo(gridX, imgY);
        c.lineTo(gridX, imgY + imgH);
        c.stroke();
      }
      for (let row = 0; row <= grid.rows; row++) {
        const gridY = imgY + (row * (grid.height + grid.offset.top + grid.offset.bottom)) / zoom;
        c.beginPath();
        c.moveTo(imgX, gridY);
        c.lineTo(imgX + imgW, gridY);
        c.stroke();
      }
      c.globalAlpha = 1;
    }
    // MOUSE BOX
    const col = Math.round((mousePos.x - imgX) / (imgW / grid.columns) - 0.5);
    const row = Math.round((mousePos.y - imgY) / (imgH / grid.rows) - 0.5);
    if (col >= 0 && row >= 0 && col < grid.columns && row < grid.rows) {
      const rectX = imgX + col * (imgW / grid.columns);
      const rectY = imgY + row * (imgH / grid.rows);
      c.strokeStyle = 'white';
      c.lineWidth = 5;
      c.strokeRect(rectX, rectY, imgW / grid.columns, imgH / grid.rows);
      c.fillStyle = 'white';
      c.font = '13px Segoe UI, sans-serif';
      c.fillText(`x: ${col} y: ${row}`, rectX, rectY - 10);
    }

    // Picked tile box
    if (tile) {
      c.strokeStyle = 'yellow';
      c.lineWidth = 5;
      const rectX = imgX + tile.sprite.pos.origin.x * (imgW / grid.columns);
      const rectY = imgY + tile.sprite.pos.origin.y * (imgH / grid.rows);
      c.strokeRect(rectX, rectY, imgW / grid.columns, imgH / grid.rows);
      c.fillStyle = 'yellow';
      c.font = '13px Segoe UI, sans-serif';
      c.fillText(`x: ${tile.sprite.pos.origin.x} y: ${tile.sprite.pos.origin.y}`, rectX, rectY - 10);
    }
  }, [canvasRef, size, tileset, zoom, offset, mousePos, image, showGrid, tile]);

  function handleWheel(e: React.WheelEvent) {
    if (zoom && tileset && tileset.image && canvasRef.current) {
      const newZoom = e.deltaY > 0 ? zoom * (1 + ZOOM_INCREMENT) : zoom * (1 - ZOOM_INCREMENT);
      const { width, height } = canvasRef.current;
      const w = tileset.image.width / zoom;
      const h = tileset.image.height / zoom;
      const x = offset.x + (w - width) / -2;
      const y = offset.y + (h - height) / -2;
      const offX = mousePos.x - (x + w / 2) - (((mousePos.x - (x + w / 2)) / w) * tileset.image.width) / newZoom;
      const offY = mousePos.y - (y + h / 2) - (((mousePos.y - (y + h / 2)) / h) * tileset.image.height) / newZoom;
      setZoom(newZoom);
      setOffset({ x: offset.x + offX, y: offset.y + offY });
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (e.button === 1) {
      //MIDDLE CLICK
      startPos = { x: e.clientX, y: e.clientY };
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
    } else if (e.button === 0 && tileset && tileset.image && zoom && canvasRef.current) {
      const grid = tileset.grid;
      const { width, height } = canvasRef.current;
      const w = tileset.image.width / zoom;
      const h = tileset.image.height / zoom;
      const x = offset.x + (w - width) / -2;
      const y = offset.y + (h - height) / -2;
      const col = Math.round((mousePos.x - x) / (w / grid.columns) - 0.5);
      const row = Math.round((mousePos.y - y) / (h / grid.rows) - 0.5);
      dispatch(
        pick({
          name: `picked.name@X${col}Y${row}`,
          tileset: tileset.id,
          sprite: { pos: { origin: { x: col, y: row } }, tileset: tileset.id, type: Types.SPRITE_BASIC },
          tags: [],
          type: Types.TILE_BASIC,
        }),
      );
    } else if (e.button === 2) dispatch(unpick());
  }
  function handleDrag(e: MouseEvent) {
    const x = offset.x + (e.clientX - startPos.x);
    const y = offset.y + (e.clientY - startPos.y);
    setOffset({ x: x, y: y });
  }
  function handleMouseUp(e: MouseEvent) {
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'default';
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }

  if (tileset && tileset.image)
    return (
      <>
        <div className={styles.title}>
          <span>TILE PICKER</span>
          <SquareButton
            icon='debug-restart'
            onClick={() => {
              setOffset({ x: 0, y: 0 });
              setZoom(null);
            }}
            title='reset zoom'
          />
          <SquareButton
            icon='edit'
            onClick={() => {
              if ((!selected && tileset) || (selected && tileset && selected.id !== tileset.id))
                dispatch(select({ type: Types.TILESET, id: tileset.id }));
            }}
            title='edit tileset'
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
            icon='info'
            isActive={showControls}
            onClick={() => {
              setShowControls(!showControls);
            }}
            title='show controls'
          />
        </div>
        <div className={styles.canvasContainer}>
          <canvas
            ref={canvasRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            className={styles.canvas}
            width={Math.max(0, size.width - 20)}
            height={Math.max(0, size.height - 40 - 10)}
          />
          {showControls ? (
            <div className={styles.controls}>
              <p className='icon icon-info' />
              <p>TODO</p>
              <p>{`scroll -> zoom`}</p>
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
          {tileset && !tileset.image ? 'The selected tileset has no image' : 'Select a tileset using right click'}
        </div>
      </>
    );
}
