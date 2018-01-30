// libs
import { combineReducers } from 'redux';

// reducers
import tokenAuth from './tokenAuth';
import featuredArticle from './featuredArticle';
import articleDetail from './articleDetail';
import header from './header';


const appReducer = combineReducers({
  tokenAuth,
  featuredArticle,
  articleDetail,
  header,
});

export default appReducer;
