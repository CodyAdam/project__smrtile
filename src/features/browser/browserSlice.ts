import { createSlice, createEntityAdapter, PayloadAction, createAction } from '@reduxjs/toolkit';
import { BrowserHistory, BrowserState, ObjectType, Rule, SmartTile, Tileset, UUID } from './browserTypes';

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

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    addRule: (state, action: PayloadAction<UUID>) => {
      const newRule: Rule = {
        type: ObjectType.RULE,
        name: "Nameless Rule",
        tags: [],
        isGlobal: false,
        timelineIndex: 0,
        thumbnail: null,
        id: action.payload,
        Rulesets: [],
      }
      rulesAdapter.addOne(state.rules, newRule)
      state.selection = { type: ObjectType.RULE, id: action.payload }
    },
  }
})

//Actions 
const historyActions = {
  undo: createAction(BrowserHistory.UNDO),
  redo: createAction(BrowserHistory.REDO)
}
export const { undo, redo } = historyActions
export const { addRule } = browserSlice.actions;

//Reducer 
export default browserSlice.reducer

