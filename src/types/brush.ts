import { ID, Types, Tag, Tile } from './general'

export interface Brush {
  type: Types.BRUSH,
  isValid: boolean,
  name: string,
  timelineIndex: number,
  defaultTile: Tile | undefined,
  isToggleable: boolean,
  rulesets: Ruleset[],
  tags: Tag[],
  id: ID,
}
export interface Ruleset {
  index: number
  name: string
  rules: Rule[]
}
export interface Rule {
  name: string,
  input: Pattern[],
  output: { probability: number, pattern: Pattern }[],
}


export enum PatternValueTypes {
  ANY = 'any',
  SELF = 'self',
}
export enum PatternLogicTypes {
  NOT = 'not',
  OR = 'or',
  AND = 'and',
}
export type Pattern = {
  layer: number,
  x: number,
  y: number,
  tile: PatternLogic
}[]
export interface PatternLogic {
  logic: PatternLogicTypes | undefined
  value: FinalValue
}
export type FinalValue = {
  type: PatternValueTypes | Types.TILE,
}


