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
export type UUID = ReturnType<typeof nanoid>;
export type TileSymbol = {} // TODO
export type Thumbnail = Tile | TileSymbol | null
export type Vector2 = { x: number, y: number }
export type Tag = { type: ObjectType.TAG, value: string };
export type Base64 = string;
export type TileGroup = Tile[]
export type Tile = BasicTile | SmartTile
export interface BasicTile {
  type: ObjectType.TILE
  tilesetPosition: Vector2
  tileset: UUID
}

export interface BrowserState { // store
  rules: EntityState<Rule>,
  smartTiles: EntityState<SmartTile>,
  tilesets: EntityState<Tileset>,
  selection: BrowserSelection
}
export type BrowserSelection = null | {
  type: ObjectType.RULE | ObjectType.TILESET | ObjectType.SMARTTILE,
  id: UUID
}

export interface Rule {
  type: ObjectType.RULE
  name: string
  tags: Tag[]
  isGlobal: boolean
  timelineIndex: number
  thumbnail: Thumbnail
  id: UUID
  Rulesets: Ruleset[]
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
  type: ObjectType.SMARTTILE
  name: string
  tags: Tag[]
  thumbnail: Thumbnail
  linkedRules: Rule[]
  id: UUID
}

export interface Tileset {
  type: ObjectType.TILESET
  name: string
  tags: Tag[]
  filters: TilesetFilter[]
  image: Base64
  width: number
  height: number
  grid: {
    columns: number
    rows: number
    tile: {
      width: number
      height: number
      offset: Offset
    },
  }
  thumbnail: Thumbnail[]
  id: UUID
}
export type TilesetFilter = 'pixelated' | 'transparent'
export type Offset = { top: number, right: number, bottom: number, left: number }

