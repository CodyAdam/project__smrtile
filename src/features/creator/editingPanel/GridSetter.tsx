import styles from './Panel.module.css';
import { GridSettings, Tileset } from '../browserTypes';
import { NumberInput } from '../../../common/numberInput/NumberInput';
import { useEffect, useState } from 'react';
import { WarnBox } from '../../../common/warnBox/WarnBox';
import { CheckboxInput } from '../../../common/checkboxInput/CheckboxInput';
import { TextButton } from '../../../common/textButton/TextButton';
import { update } from '../browserSlice';
import { useAppDispatch } from '../../../app/hooks';

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
      grid.rows * (grid.height + grid.offset.top + grid.offset.bottom) === height &&
      grid.height === Math.floor(grid.height);
    return isRows && isHeight;
  }

  function isColumnsValid(): boolean {
    if (!selected.sprite) return true;
    const { width } = selected.sprite;
    const isColumns = width % grid.columns === 0 && grid.columns === Math.floor(grid.columns);
    const isWidth =
      grid.columns * (grid.width + grid.offset.right + grid.offset.left) === width &&
      grid.width === Math.floor(grid.width);
    return isColumns && isWidth;
  }
  return (
    <>
      {!isSquared ? <WarnBox message='Rectangle tiles are not yet supported' /> : null}
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
                      width: getSanitazedValue(selected.sprite.width / columns - grid.offset.right - grid.offset.left),
                      height: getSanitazedValue(selected.sprite.width / columns - grid.offset.right - grid.offset.left),
                      rows: getSanitazedValue(
                        selected.sprite.height /
                          getSanitazedValue(selected.sprite.width / columns - grid.offset.right - grid.offset.left),
                      ),
                    }
                  : {
                      ...grid,
                      columns: columns,
                      width: getSanitazedValue(selected.sprite.width / columns - grid.offset.right - grid.offset.left),
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
                onChange={(size) => {
                  if (selected.sprite) {
                    const newGrid: GridSettings = {
                      ...grid,
                      width: size,
                      height: size,
                      columns: getSanitazedValue(selected.sprite.width / (size + grid.offset.left + grid.offset.right)),
                      rows: getSanitazedValue(selected.sprite.height / (size + grid.offset.top + grid.offset.bottom)),
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
                    columns: getSanitazedValue(selected.sprite.width / (width + grid.offset.left + grid.offset.right)),
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
                      height: getSanitazedValue(selected.sprite.height / rows - grid.offset.top - grid.offset.bottom),
                      width: getSanitazedValue(selected.sprite.height / rows - grid.offset.top - grid.offset.bottom),
                    }
                  : {
                      ...grid,
                      rows: rows,
                      height: getSanitazedValue(selected.sprite.height / rows - grid.offset.top - grid.offset.bottom),
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
                        rows: getSanitazedValue(
                          selected.sprite.height / (height + grid.offset.top + grid.offset.bottom),
                        ),
                        columns: getSanitazedValue(
                          selected.sprite.width / (height + grid.offset.top + grid.offset.bottom),
                        ),
                      }
                    : {
                        ...grid,
                        height: height,
                        rows: getSanitazedValue(
                          selected.sprite.height / (height + grid.offset.top + grid.offset.bottom),
                        ),
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
          if (!bool) setGrid({ ...grid, offset: { top: 0, right: 0, bottom: 0, left: 0 } });
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
                    rows: getSanitazedValue(selected.sprite.height / (grid.height + top + grid.offset.bottom)),
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
                    rows: getSanitazedValue(selected.sprite.height / (grid.height + grid.offset.top + bottom)),
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
                    columns: getSanitazedValue(selected.sprite.width / (grid.width + right + grid.offset.left)),
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
                    columns: getSanitazedValue(selected.sprite.width / (grid.width + left + grid.offset.right)),
                  };
                  setGrid(newGrid);
                }
              }}
            />
          </div>
        </div>
      ) : null}
      <TextButton
        title='Apply changes'
        invalid={!isRowValid() || !isColumnsValid()}
        invalidText='Some of the inputs are not valid'
        onClick={() => {
          dispatch(update({ target: selected, changes: { grid: grid } }));
        }}
      />
    </>
  );
}
