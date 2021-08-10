import styles from './Panel.module.css';
import { GridSettings, Tileset } from '../browser/browserTypes';
import { NumberInput } from '../../common/numberInput/NumberInput';
import { useAppDispatch } from '../../app/hooks';
import { updateTileset } from '../browser/browserSlice';

export function GridSetter({ selected }: { selected: Tileset }) {
  const dispatch = useAppDispatch();

  function isGridValid(grid: GridSettings): boolean {
    if (!selected.sprite) return true;
    const { width, height } = selected.sprite;
    const isRows = height % grid.rows === 0;
    const isColumns = width % grid.columns === 0;
    const isHeight = grid.height * grid.rows === height;
    const isWidth = grid.width * grid.columns === width;
    return true;
    // return isRows && isColumns && isHeight && isWidth;
  }
  return (
    <>
      <div className={styles.grid}>
        <div className={styles.column}>
          <NumberInput
            key={`columns ${selected.grid.columns}`}
            value={selected.grid.columns}
            title='Columns'
            onChange={(columns) => {
              if (selected.sprite) {
                const newGrid: GridSettings = {
                  ...selected.grid,
                  columns: columns,
                  width: selected.sprite.width / columns,
                };
                if (isGridValid(newGrid)) dispatch(updateTileset({ id: selected.id, changes: { grid: newGrid } }));
              }
            }}
          />
          <NumberInput
            key={`width ${selected.grid.width}`}
            value={selected.grid.width}
            title='Width'
            onChange={(width) => {
              if (selected.sprite) {
                const newGrid: GridSettings = {
                  ...selected.grid,
                  width: width,
                  columns: selected.sprite.width / width,
                };
                if (isGridValid(newGrid)) dispatch(updateTileset({ id: selected.id, changes: { grid: newGrid } }));
              }
            }}
          />
        </div>
        <div className={styles.column}>
          <NumberInput
            key={`rows ${selected.grid.rows}`}
            value={selected.grid.rows}
            title='Rows'
            onChange={(rows) => {
              if (selected.sprite) {
                const newGrid: GridSettings = {
                  ...selected.grid,
                  rows: rows,
                  height: selected.sprite.height / rows,
                };
                if (isGridValid(newGrid)) dispatch(updateTileset({ id: selected.id, changes: { grid: newGrid } }));
              }
            }}
          />

          <NumberInput
            key={`height ${selected.grid.height}`}
            value={selected.grid.height}
            title='Height'
            onChange={(height) => {
              if (selected.sprite) {
                const newGrid: GridSettings = {
                  ...selected.grid,
                  height: height,
                  rows: selected.sprite.height / height,
                };
                if (isGridValid(newGrid)) dispatch(updateTileset({ id: selected.id, changes: { grid: newGrid } }));
              }
            }}
          />
        </div>
      </div>
      {JSON.stringify(selected.grid)}
    </>
  );
}
