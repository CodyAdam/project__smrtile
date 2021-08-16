import { createSlice, createEntityAdapter, PayloadAction, createAction, createSelector, Update } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BrowserHistory, BrowserState, ObjectType, Rule, SmartTile, Tileset, ID, Selection, SelectionTypes, SelectionObject } from './browserTypes';

//Normalize with EntityAdapter
const rulesAdapter = createEntityAdapter<Rule>()
const smartTilesAdapter = createEntityAdapter<SmartTile>()
const tilesetsAdapter = createEntityAdapter<Tileset>()

//Initial State
const initialState: BrowserState = {
  rules: rulesAdapter.getInitialState(),
  smartTiles: smartTilesAdapter.getInitialState(),
  tilesets: tilesetsAdapter.getInitialState(),
  selection: null
}
const defaultRule: Rule = {
  type: ObjectType.RULE,
  name: "Nameless Rule",
  tags: [],
  isGlobal: false,
  timelineIndex: 0,
  thumbnail: null,
  Rulesets: [],
  id: '',
}
const defaultSmartTile: SmartTile = {
  type: ObjectType.SMARTTILE,
  name: "Nameless SmartTile",
  tags: [],
  thumbnail: null,
  linkedRules: [],
  id: ''
}
const defaultTileset: Tileset = {
  type: ObjectType.TILESET,
  name: "Nameless Tileset",
  tags: [],
  filters: [],
  sprite: undefined,
  grid: {
    columns: 0,
    rows: 0,
    width: 0,
    height: 0,
    offset: { top: 0, right: 0, bottom: 0, left: 0 }
  },
  thumbnail: [],
  id: '',

}

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ type: SelectionTypes, id: ID }>) => {
      const { type, id } = action.payload;
      switch (type) {
        case ObjectType.RULE:
          rulesAdapter.addOne(state.rules, { ...defaultRule, id })
          state.selection = { type: ObjectType.RULE, id }
          break;
        case ObjectType.SMARTTILE:
          smartTilesAdapter.addOne(state.smartTiles, { ...defaultSmartTile, id })
          state.selection = { type: ObjectType.SMARTTILE, id }
          break;
        case ObjectType.TILESET:
          tilesetsAdapter.addOne(state.tilesets, { ...defaultTileset, id })
          state.selection = { type: ObjectType.TILESET, id }
          break;
      }
    },
    remove: (state, action: PayloadAction<SelectionObject>) => {
      const target = action.payload;
      switch (target.type) {
        case ObjectType.RULE:
          rulesAdapter.removeOne(state.rules, target.id)
          if (state.selection && state.selection.id === target.id)
            state.selection = null
          break;
        case ObjectType.SMARTTILE:
          smartTilesAdapter.removeOne(state.smartTiles, target.id)
          if (state.selection && state.selection.id === target.id)
            state.selection = null
          break;
        case ObjectType.TILESET:
          tilesetsAdapter.removeOne(state.tilesets, target.id)
          if (state.selection && state.selection.id === target.id)
            state.selection = null
          break;
      }
    },
    update: (state, actions: PayloadAction<{ target: SelectionObject, changes: Partial<SelectionObject> }>) => {
      const { target, changes } = actions.payload;
      switch (target.type) {
        case ObjectType.RULE: rulesAdapter.updateOne(state.rules, { id: target.id, changes: changes as Rule })
          break;
        case ObjectType.SMARTTILE: smartTilesAdapter.updateOne(state.smartTiles, { id: target.id, changes: changes as SmartTile })
          break
        case ObjectType.TILESET: tilesetsAdapter.updateOne(state.tilesets, { id: target.id, changes: changes as Tileset })
          break;
      }
    },
    select: (state, action: PayloadAction<Selection>) => {
      state.selection = { type: action.payload.type, id: action.payload.id }
    },
    deselect: state => { state.selection = null }
  }
})

//Reducer 
export default browserSlice.reducer

//Actions 
const historyActions = {
  undo: createAction(BrowserHistory.UNDO),
  redo: createAction(BrowserHistory.REDO)
}
export const { undo, redo } = historyActions
export const { add, select, deselect, update, remove } = browserSlice.actions;

//Selectors
export const historyIndexSelector = createSelector(
  (state: RootState) => state.browser.index,
  index => index)
export const selectedSelector = createSelector(
  (state: RootState) => state.browser.present,
  state => state.selection)
export const rulesSelector = createSelector(
  (state: RootState) => state.browser.present.rules,
  rulesAdapter.getSelectors().selectAll)
export const smartTilesSelector = createSelector(
  (state: RootState) => state.browser.present.smartTiles, smartTilesAdapter.getSelectors().selectAll)
export const tilesetsSelector = createSelector(
  (state: RootState) => state.browser.present.tilesets,
  tilesetsAdapter.getSelectors().selectAll)
export const selectedContentSelector = createSelector(
  (state: RootState) => state.browser.present,
  (state: BrowserState) => {
    if (!state.selection) return null;
    switch (state.selection.type) {
      case ObjectType.RULE:
        return rulesAdapter.getSelectors().selectById(state.rules, state.selection.id)
      case ObjectType.SMARTTILE:
        return smartTilesAdapter.getSelectors().selectById(state.smartTiles, state.selection.id)
      case ObjectType.TILESET:
        return tilesetsAdapter.getSelectors().selectById(state.tilesets, state.selection.id)
      default:
        return null;
    }
  })

