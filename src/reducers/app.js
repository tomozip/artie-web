import { combineReducers } from 'redux';
import newArrival from './newArrival';

const appReducer = combineReducers({
  newArrival,
});

export default appReducer;
