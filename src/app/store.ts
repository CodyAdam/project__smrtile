import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import browserReducer from '../features/browser/browserSlice';
import undoable from 'redux-undo';
import { BrowserHistory } from '../features/browser/browserTypes';

export const store = configureStore({
  reducer: {
    browserReducer: undoable(browserReducer, { undoType: BrowserHistory.UNDO, redoType: BrowserHistory.REDO }),
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