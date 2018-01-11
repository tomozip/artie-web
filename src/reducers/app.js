import { combineReducers } from 'redux';
import newArrival from './newArrival';
import currencyDetail from './currencyDetail';

const appReducer = combineReducers({
  newArrival,
  currencyDetail,
});

export default appReducer;
