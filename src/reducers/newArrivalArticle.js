// constants
import newArrivalArticleActionTypes from '../constants/newArrivalArticleActionTypes';
import * as contentTypes from '../constants/contentTypes';

const initialState = {
  articles: [],
  contentType: contentTypes.NEW_ARRIVAL_ARTICLE,
  cursor: Date(),
  hasNext: true,
  isFetched: false,
};

const newArrivalArticle = (state = initialState, action) => {
  switch (action.type) {
    case newArrivalArticleActionTypes.FETCH_INITIAL_NEW_ARRIVAL_ARTICLES:
      return Object.assign({}, state, {
        articles: action.newArrivalArticle.articles,
        cursor: action.newArrivalArticle.cursor,
        hasNext: action.newArrivalArticle.hasNext,
        isFetched: true,
      });
    case newArrivalArticleActionTypes.FETCH_NEXT_NEW_ARRIVAL_ARTICLES:
      return Object.assign({}, state, {
        articles: [...state.articles, ...action.newArrivalArticle.articles],
        cursor: action.newArrivalArticle.cursor,
        hasNext: action.newArrivalArticle.hasNext,
      });
    default:
      return state;
  }
};

export default newArrivalArticle;
