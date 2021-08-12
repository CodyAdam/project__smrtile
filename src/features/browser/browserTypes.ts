import { EntityState } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export enum BrowserHistory {
  UNDO = 'BROWSER_UNDO',
  REDO = 'BROWSER_REDO'
}
export enum ObjectType {
  TILE = 'tile',
  TILESET = 'tileset',
  SMARTTILE = 'smartTile',
  RULE = 'rule',
  RULESET = 'ruleset',
  TILEGROUP = 'tileGroup',
  TAG = 'tag'
}
export type ID = ReturnType<typeof nanoid>;
export type TileSymbol = {} // TODO
export type Thumbnail = Tile | TileSymbol | null
export type Vector2 = { x: number, y: number }
export type Tag = { type: ObjectType.TAG, color?: string, name: string };
export type ImageURL = string;
export type TileGroup = Tile[]
export type Tile = BasicTile | SmartTile
export interface BasicTile {
  type: ObjectType.TILE
  tilesetPosition: Vector2
  tileset: ID
}

export interface BrowserState { // store
  rules: EntityState<Rule>,
  smartTiles: EntityState<SmartTile>,
  tilesets: EntityState<Tileset>,
  selection: null | Selection
}
export type Selection = {
  type: SelectionTypes,
  id: ID
}
export type SelectionTypes = ObjectType.RULE | ObjectType.TILESET | ObjectType.SMARTTILE

export interface Rule {
  type: ObjectType.RULE
  name: string
  tags: Tag[]
  isGlobal: boolean
  timelineIndex: number
  thumbnail: Thumbnail
  Rulesets: Ruleset[]
  id: ID
}

export interface Ruleset {
  type: ObjectType.RULESET
  name: string
  input: Pattern
  output: { probability: number, pattern: Pattern }[]
}
export type Pattern = { x: number, y: number, patternTile: PatternTile, not: boolean }[]
export type PatternTile = 'any' | Tile | Tag[]

export interface SmartTile {
  type: ObjectType.SMARTTILE,
  name: string,
  tags: Tag[],
  thumbnail: Thumbnail,
  linkedRules: Rule[],
  id: ID,
}

export interface Tileset {
  type: ObjectType.TILESET,
  name: string,
  tags: Tag[],
  filters: TilesetFilter[],
  sprite: Sprite | undefined,
  grid: GridSettings,
  thumbnail: Thumbnail[],
  id: ID,
}
export type GridSettings = {
  columns: number,
  rows: number,
  width: number,
  height: number,
  offset: Offset,
}
export type Sprite = {
  url: string,
  width: number,
  height: number,
}
export type TilesetFilter = 'pixelated' | 'transparent'
export type Offset = { top: number, right: number, bottom: number, left: number }

