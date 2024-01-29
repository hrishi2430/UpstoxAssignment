import {configureStore} from '@reduxjs/toolkit';
import holdingReducer from './reducer';
import {thunk} from 'redux-thunk';

export default configureStore({
  reducer: {holdings: holdingReducer},
  middleware: () => [thunk],
});
