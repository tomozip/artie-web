import { combineReducers } from 'redux';
import featuredArticle from './featuredArticle';
import newArrival from './newArrival';
import currencyDetail from './currencyDetail';

const appReducer = combineReducers({
  featuredArticle,
  newArrival,
  currencyDetail,
});

export default appReducer;
