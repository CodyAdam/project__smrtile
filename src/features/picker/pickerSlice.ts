import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { PickerState, PickSelection } from '../../app/globalTypes';
import { RootState } from '../../app/store';

//Initial State
const initialState: PickerState = {
  picked: null,
}
export const pickerSlice = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    pick: (state, action: PayloadAction<PickSelection>) => {
      state.picked = action.payload
    },
    unselect: (state) => { state.picked = null; }
  }
})

//Reducer 
export default pickerSlice.reducer

//Actions 
export const { pick, unselect } = pickerSlice.actions;

//Selectors
export const pickedSelector = createSelector(
  (state: RootState) => state.picker,
  picker => picker.picked)
