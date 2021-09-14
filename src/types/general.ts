
export enum Types {
  TILE = 'tile',
  BRUSH = 'brush',
  TILESET = 'tileset',
  SPRITE = 'sprite',
}

export type ID = string;
export type Vector2 = { x: number, y: number }
export type Tag = { color?: string, name: string };
export type ImageURL = string;
export interface Tile {
  type: Types.TILE,
  tileset: ID,
  sprite: Sprite,
  tags: Tag[],
}
export interface Sprite {
  type: Types.SPRITE
  tileset: ID,
  pos: { origin: Vector2 },
}