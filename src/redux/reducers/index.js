import { combineReducers } from 'redux';
import user from './user';
import time from './time';

const rootReducer = combineReducers({
  user,
  time,
});

export default rootReducer;
