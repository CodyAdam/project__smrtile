import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import browserReducer from '../features/creator/creatorSlice';
import undoable from 'redux-undo';
import { BrowserHistory } from './globalTypes';

export const store = configureStore({
  reducer: {
    browser: undoable(browserReducer, { undoType: BrowserHistory.UNDO, redoType: BrowserHistory.REDO }),
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;