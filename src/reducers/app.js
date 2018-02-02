// libs
import { combineReducers } from 'redux';

// reducers
import tokenAuth from './tokenAuth';
import featuredArticle from './featuredArticle';
import articleDetail from './articleDetail';
import header from './header';

const appReducer = isClient => combineReducers({
  tokenAuth: isClient ? tokenAuth : null,
  featuredArticle,
  articleDetail,
  header,
});

export const clientAppReducer = appReducer(true);
export const serverAppReducer = appReducer(false);
