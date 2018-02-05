// libs
import { combineReducers } from 'redux';

// reducers
import tokenAuth from './tokenAuth';
import featuredArticle from './featuredArticle';
import newArrivalArticle from './newArrivalArticle';
import articleDetail from './articleDetail';
import header from './header';

const appReducer = isClient => combineReducers({
  tokenAuth: isClient ? tokenAuth : null,
  featuredArticle,
  newArrivalArticle,
  articleDetail,
  header,
});

export const clientAppReducer = appReducer(true);
export const serverAppReducer = appReducer(false);
