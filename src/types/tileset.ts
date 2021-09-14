import { ID, Types, Tag } from './general'

export interface Tileset {
  type: Types.TILESET,
  isValid: boolean,
  name: string,
  image: ImageData | undefined,
  grid: GridSettings,
  filters: TilesetFilter[],
  tags: Tag[],
  id: ID,
}
export type ImageData = {
  url: string,
  width: number,
  height: number,
}
export type GridSettings = {
  columns: number,
  rows: number,
  width: number,
  height: number,
  offset: Offset | undefined,
}
export type Offset = { top: number, right: number, bottom: number, left: number };
export type TilesetFilter = 'pixelated' | 'transparent'