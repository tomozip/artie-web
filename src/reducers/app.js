import { combineReducers } from 'redux';
import featuredArticle from './featuredArticle';
import articleDetail from './articleDetail';
import newArrival from './newArrival';

const appReducer = combineReducers({
  featuredArticle,
  articleDetail,
  newArrival,
});

export default appReducer;
