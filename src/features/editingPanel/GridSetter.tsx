import styles from './Panel.module.css';
import { GridSettings, Tileset } from '../browser/browserTypes';
import { NumberInput } from '../../common/numberInput/NumberInput';
import { useEffect, useState } from 'react';
import { WarnBox } from '../../common/warnBox/WarnBox';
import { CheckboxInput } from '../../common/checkboxInput/CheckboxInput';
import { TextButton } from '../../common/textButton/TextButton';
import { updateTileset } from '../browser/browserSlice';
import { useAppDispatch } from '../../app/hooks';

export function GridSetter({ selected }: { selected: Tileset }) {
  const dispatch = useAppDispatch();
  const [grid, setGrid] = useState(selected.grid);
  const [isSquared, setIsSquared] = useState(selected.grid.height === selected.grid.width);
  const [useOffset, setUseOffset] = useState(
    selected.grid.offset.bottom !== 0 ||
      selected.grid.offset.left !== 0 ||
      selected.grid.offset.right !== 0 ||
      selected.grid.offset.top !== 0,
  );

  useEffect(() => {
    setGrid(selected.grid);
    setIsSquared(selected.grid.height === selected.grid.width);
    setUseOffset(
      selected.grid.offset.bottom !== 0 ||
        selected.grid.offset.left !== 0 ||
        selected.grid.offset.right !== 0 ||
        selected.grid.offset.top !== 0,
    );
  }, [selected]);

  function getSanitazedValue(value: number): number {
    return value && value !== Infinity ? Math.floor(value * 100) / 100 : 0;
  }

  function isRowValid(): boolean {
    if (!selected.sprite) return true;
    const { height } = selected.sprite;
    const isRows = height % grid.rows === 0 && grid.rows === Math.floor(grid.rows);
    const isHeight =
      grid.height * grid.rows + grid.offset.top + grid.offset.bottom === height &&
      grid.height === Math.floor(grid.height);
    return isRows && isHeight;
  }

  function isColumnsValid(): boolean {
    if (!selected.sprite) return true;
    const { width } = selected.sprite;
    const isColumns = width % grid.columns === 0 && grid.columns === Math.floor(grid.columns);
    const isWidth =
      grid.width * grid.columns + grid.offset.right + grid.offset.left === width &&
      grid.width === Math.floor(grid.width);
    return isColumns && isWidth;
  }
  return (
    <>
      {!selected.sprite ? <WarnBox message='You have to import an image first' /> : null}
      <CheckboxInput
        value={isSquared}
        title='Squared tile'
        onChange={(bool) => {
          if (bool) setGrid({ ...grid, height: grid.width });
          setIsSquared(bool);
        }}
      />
      <div className={styles.grid}>
        <div className={styles.column}>
          <NumberInput
            value={grid.columns}
            title='Columns'
            invalid={!isColumnsValid()}
            onChange={(columns) => {
              if (selected.sprite) {
                const newGrid: GridSettings = isSquared
                  ? {
                      ...grid,
                      columns: columns,
                      width: getSanitazedValue(selected.sprite.width / columns),
                      height: getSanitazedValue(selected.sprite.width / columns),
                      rows: getSanitazedValue(
                        selected.sprite.height / getSanitazedValue(selected.sprite.width / columns),
                      ),
                    }
                  : {
                      ...grid,
                      columns: columns,
                      width: getSanitazedValue(selected.sprite.width / columns),
                    };
                setGrid(newGrid);
              }
            }}
          />
          {isSquared ? (
            <div>
              <NumberInput
                value={grid.width}
                title='Tile size'
                invalid={!isColumnsValid() || !isRowValid()}
                onChange={(width) => {
                  if (selected.sprite) {
                    const newGrid: GridSettings = {
                      ...grid,
                      width: width,
                      height: width,
                      columns: getSanitazedValue(selected.sprite.width / width),
                      rows: getSanitazedValue(selected.sprite.height / width),
                    };
                    setGrid(newGrid);
                  }
                }}
              />
            </div>
          ) : (
            <NumberInput
              value={grid.width}
              title='Tile width'
              invalid={!isColumnsValid()}
              onChange={(width) => {
                if (selected.sprite) {
                  const newGrid: GridSettings = {
                    ...grid,
                    width: width,
                    columns: getSanitazedValue(selected.sprite.width / width),
                  };
                  setGrid(newGrid);
                }
              }}
            />
          )}
        </div>
        <div className={styles.column}>
          <NumberInput
            value={grid.rows}
            title='Rows'
            invalid={!isRowValid()}
            onChange={(rows) => {
              if (selected.sprite) {
                const newGrid: GridSettings = isSquared
                  ? {
                      ...grid,
                      rows: rows,
                      columns: getSanitazedValue(
                        selected.sprite.width / getSanitazedValue(selected.sprite.height / rows),
                      ),
                      height: getSanitazedValue(selected.sprite.height / rows),
                      width: getSanitazedValue(selected.sprite.height / rows),
                    }
                  : {
                      ...grid,
                      rows: rows,
                      height: getSanitazedValue(selected.sprite.height / rows),
                    };
                setGrid(newGrid);
              }
            }}
          />
          {isSquared ? null : (
            <NumberInput
              value={grid.height}
              title='Tile height'
              invalid={!isRowValid()}
              onChange={(height) => {
                if (selected.sprite) {
                  const newGrid: GridSettings = isSquared
                    ? {
                        ...grid,
                        height: height,
                        width: height,
                        rows: getSanitazedValue(selected.sprite.height / height),
                        columns: getSanitazedValue(selected.sprite.width / height),
                      }
                    : {
                        ...grid,
                        height: height,
                        rows: getSanitazedValue(selected.sprite.height / height),
                      };

                  setGrid(newGrid);
                }
              }}
            />
          )}
        </div>
      </div>

      <CheckboxInput
        value={useOffset}
        title='Use offset'
        onChange={(bool) => {
          if (!bool) setGrid({ ...grid, offset: { top: 0, bottom: 0, left: 0, right: 0 } });
          setUseOffset(bool);
        }}
      />
      {useOffset ? (
        <div className={styles.grid}>
          <div className={styles.column}>
            <NumberInput
              value={grid.offset.top}
              title='Top offset'
              invalid={!isRowValid()}
              onChange={(top) => {
                if (selected.sprite) {
                  const newGrid: GridSettings = {
                    ...grid,
                    offset: { ...grid.offset, top },
                  };
                  setGrid(newGrid);
                }
              }}
            />
            <NumberInput
              value={grid.offset.bottom}
              title='Bottom offset'
              invalid={!isRowValid()}
              onChange={(bottom) => {
                if (selected.sprite) {
                  const newGrid: GridSettings = {
                    ...grid,
                    offset: { ...grid.offset, bottom },
                  };
                  setGrid(newGrid);
                }
              }}
            />
          </div>
          <div className={styles.column}>
            <NumberInput
              value={grid.offset.right}
              title='Right offset'
              invalid={!isColumnsValid()}
              onChange={(right) => {
                if (selected.sprite) {
                  const newGrid: GridSettings = {
                    ...grid,
                    offset: { ...grid.offset, right },
                  };
                  setGrid(newGrid);
                }
              }}
            />
            <NumberInput
              value={grid.offset.left}
              title='Left offset'
              invalid={!isColumnsValid()}
              onChange={(left) => {
                if (selected.sprite) {
                  const newGrid: GridSettings = {
                    ...grid,
                    offset: { ...grid.offset, left },
                  };
                  setGrid(newGrid);
                }
              }}
            />
          </div>
        </div>
      ) : null}
      <TextButton
        title='Apply'
        invalid={!isRowValid() || !isColumnsValid()}
        onClick={() => {
          dispatch(updateTileset({ id: selected.id, changes: { grid: grid } }));
        }}
      />
    </>
  );
}
