import { combineReducers } from 'redux';
import featuredArticle from './featuredArticle';
import articleDetail from './articleDetail';

const appReducer = combineReducers({
  featuredArticle,
  articleDetail,
});

export default appReducer;
