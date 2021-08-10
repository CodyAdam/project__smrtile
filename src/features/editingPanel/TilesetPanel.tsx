import styles from './Panel.module.css';
import { GridSettings, Tileset, TilesetFilter } from '../browser/browserTypes';
import { Propertie } from '../../common/propertie/Propertie';
import { ImageInput } from '../../common/fileInput/ImageInput';
import { ImagePreview } from '../../common/fileInput/ImagePreview';
import { useAppDispatch } from '../../app/hooks';
import { updateTileset } from '../browser/browserSlice';
import { CheckboxInput } from '../../common/checkboxInput/CheckboxInput';
import { NumberInput } from '../../common/numberInput/NumberInput';

export function TilesetPanel({ selected }: { selected: Tileset }) {
  const dispatch = useAppDispatch();

  function setFilter(filter: TilesetFilter, value: boolean): TilesetFilter[] {
    const filters = [...selected.filters];
    if (value) return Array.from(new Set([...filters, filter]));
    else if (filters.includes(filter)) {
      filters.splice(filters.indexOf(filter), 1);
      return filters;
    } else return filters;
  }

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
    <div className={styles.container}>
      <h1>Tileset</h1>
      <Propertie name='Import image' about='Upload the tilesheet image for the tileset'>
        <>
          <ImageInput
            onChange={(sprite) => {
              //TODO
              // if (selected.imageUrl) window.URL.revokeObjectURL(selected.imageUrl);
              dispatch(updateTileset({ id: selected.id, changes: { sprite: sprite } }));
            }}
          />
        </>
      </Propertie>
      <Propertie name='Preview'>
        <ImagePreview sprite={selected.sprite} filters={selected.filters} />
      </Propertie>
      <Propertie name='Grid' about='Set the grid layout size\nDesc TODO'>
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
      </Propertie>

      <Propertie
        name='Filters'
        about='Add filters to your tileset for display purpose\nChoose whether or not the image should be pixelated'
      >
        <>
          <CheckboxInput
            title='Pixelated'
            value={selected.filters.includes('pixelated')}
            onChange={(value) => {
              dispatch(updateTileset({ id: selected.id, changes: { filters: setFilter('pixelated', value) } }));
            }}
          />
        </>
      </Propertie>
    </div>
  );
}
