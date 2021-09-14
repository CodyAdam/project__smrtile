import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { ID, PickerState, PickSelection } from '../types/general';
import { RootState } from './store';

//Initial State
const initialState: PickerState = {
  tileset: null,
  picked: null,
}
export const pickerSlice = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    pickTileset: (state, action: PayloadAction<ID>) => {
      state.tileset = action.payload;
      state.picked = null;
    },
    pick: (state, action: PayloadAction<PickSelection>) => {
      state.picked = action.payload
    },
    unpickTileset: (state) => { state.tileset = null; },
    unpick: (state) => { state.picked = null; }
  }
})

//Reducer 
export default pickerSlice.reducer

//Actions 
export const { pick, unpickTileset, pickTileset, unpick } = pickerSlice.actions;

//Selectors
export const pickedTileSelector = createSelector(
  (state: RootState) => state.picker,
  picker => picker.picked)
export const pickedTilesetContentSelector = createSelector(
  (state: RootState) => state,
  state => {
    if (state.picker.tileset)
      return state.browser.present.tilesets.entities[state.picker.tileset]
  })
export const pickedTilesetSelector = createSelector(
  (state: RootState) => state.picker,
  picker => picker.tileset)
